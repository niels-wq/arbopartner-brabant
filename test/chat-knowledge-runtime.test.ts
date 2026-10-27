import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";
import { FALLBACK_TEXT, handleChatMessage, processChat, resetChatLimits } from "../server/chat-ai.mjs";
import { resetKnowledgeCache } from "../server/chat-prompt.mjs";
import { publicError } from "../server/public-error.mjs";

const KEY = "xai-geheim-kennis-999";
const saved = {
  enabled: process.env.CHAT_AI_ENABLED,
  key: process.env.XAI_API_KEY,
  root: process.env.CHAT_SOURCE_ROOT,
  snapshot: process.env.CHAT_KNOWLEDGE_FILE,
};

function restoreEnv() {
  if (saved.enabled === undefined) delete process.env.CHAT_AI_ENABLED;
  else process.env.CHAT_AI_ENABLED = saved.enabled;
  if (saved.key === undefined) delete process.env.XAI_API_KEY;
  else process.env.XAI_API_KEY = saved.key;
  if (saved.root === undefined) delete process.env.CHAT_SOURCE_ROOT;
  else process.env.CHAT_SOURCE_ROOT = saved.root;
  if (saved.snapshot === undefined) delete process.env.CHAT_KNOWLEDGE_FILE;
  else process.env.CHAT_KNOWLEDGE_FILE = saved.snapshot;
  resetKnowledgeCache();
  resetChatLimits();
}

function response() {
  return {
    headersSent: false,
    statusCode: 0,
    body: "",
    writeHead(status: number) {
      this.headersSent = true;
      this.statusCode = status;
    },
    end(body: string) {
      this.body = body;
    },
  };
}

function request() {
  const raw = Buffer.from(JSON.stringify({
    session: "healthcheck-2",
    messages: [{ role: "user", content: "hoi" }],
  }));
  return {
    method: "POST",
    headers: {
      origin: "https://www.arbopartnerbrabant.nl",
      host: "www.arbopartnerbrabant.nl",
    },
    socket: { remoteAddress: "203.0.113.77" },
    async *[Symbol.asyncIterator]() {
      yield raw;
    },
  };
}

describe("kennisbank in de container", { concurrency: 1 }, () => {
  let dir = "";

  after(async () => {
    restoreEnv();
    if (dir) await rm(dir, { recursive: true, force: true });
  });

  it("geeft fallback-JSON en een log zonder sleutel als src en snapshot ontbreken", async () => {
    dir = await mkdtemp(path.join(tmpdir(), `${KEY}-`));
    const empty = path.join(dir, "leeg");
    await mkdir(empty);
    process.env.CHAT_AI_ENABLED = "true";
    process.env.XAI_API_KEY = KEY;
    process.env.CHAT_SOURCE_ROOT = empty;
    process.env.CHAT_KNOWLEDGE_FILE = path.join(dir, "ontbreekt.json");
    resetKnowledgeCache();
    resetChatLimits();
    const logs: string[] = [];
    const original = console.error;
    console.error = (...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
    };
    const res = response();
    try {
      await handleChatMessage(request(), res, {
        fetchImpl: async () => {
          throw new Error("fetch hoort niet");
        },
      });
      assert.equal(publicError(new Error(`pad ${KEY} kapot`)).includes(KEY), false);
    } finally {
      console.error = original;
      restoreEnv();
    }
    assert.equal(res.statusCode, 200);
    assert.equal(res.headersSent, true);
    const payload = JSON.parse(res.body);
    assert.equal(payload.fallback, true);
    assert.equal(payload.reply, FALLBACK_TEXT);
    assert.match(logs.join("\n"), /\[chat\] verzoek mislukt/);
    assert.match(logs.join("\n"), /\[weggelaten\]/);
    assert.equal(logs.join("\n").includes(KEY), false);
  });

  it("leest de snapshot als src ontbreekt en roept xAI aan", async () => {
    if (!dir) dir = await mkdtemp(path.join(tmpdir(), `${KEY}-`));
    const empty = path.join(dir, "leeg");
    await mkdir(empty, { recursive: true });
    const snapshot = path.join(dir, "chat-knowledge.json");
    await writeFile(snapshot, JSON.stringify({
      text: "DIENSTEN (bron: /diensten)\n- /diensten/verzuimanalyse: Verzuimanalyse. Korte testregel.",
    }));
    process.env.CHAT_AI_ENABLED = "true";
    process.env.XAI_API_KEY = KEY;
    process.env.CHAT_SOURCE_ROOT = empty;
    process.env.CHAT_KNOWLEDGE_FILE = snapshot;
    resetKnowledgeCache();
    resetChatLimits();
    const seen: { body?: string }[] = [];
    const logs: string[] = [];
    const original = console.error;
    console.error = (...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
    };
    try {
      const result = await processChat({
        session: "healthcheck-2",
        messages: [{ role: "user", content: "hoi" }],
        ip: "203.0.113.78",
        host: "www.arbopartnerbrabant.nl",
        origin: "https://www.arbopartnerbrabant.nl",
      }, {
        now: 1_700_000_000_000,
        fetchImpl: async (_url: string, init: { body: string }) => {
          seen.push({ body: init.body });
          return {
            ok: true,
            status: 200,
            async json() {
              return { choices: [{ message: { content: "Hoi. Waar loop je tegenaan?" } }] };
            },
          };
        },
      });
      assert.equal(result.payload.fallback, undefined);
      assert.match(result.payload.reply, /Hoi/);
    } finally {
      console.error = original;
      restoreEnv();
    }
    assert.equal(seen.length, 1);
    const body = JSON.parse(seen[0].body || "{}");
    assert.match(body.messages[0].content, /\/diensten\/verzuimanalyse/);
    assert.match(logs.join("\n"), /kennisbank uit snapshot/);
    assert.match(logs.join("\n"), /\[weggelaten\]/);
    assert.equal(logs.join("\n").includes(KEY), false);

    const docker = await readFile("Dockerfile", "utf8");
    assert.match(docker, /COPY --from=build \/app\/server\/chat-knowledge\.json \.\/server\/chat-knowledge\.json/);
    const pkg = JSON.parse(await readFile("package.json", "utf8"));
    assert.match(pkg.scripts.build, /write-chat-knowledge\.mjs/);
    assert.match(await readFile("server/index.mjs", "utf8"), /console\.error\("\[server\]", publicError\(error\)\)/);
  });
});
