import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { handleApi } from "../server/forms.mjs";
import { signStamp } from "../server/spam.mjs";
import { buildKnowledge, systemMessage } from "../server/chat-prompt.mjs";
import {
  DAY_LIMIT,
  FALLBACK_TEXT,
  IP_LIMIT,
  LEAD_SUBJECT,
  SESSION_LIMIT,
  chatConfigured,
  cleanHistory,
  processChat,
  resetChatLimits,
} from "../server/chat-ai.mjs";

const now = 1_700_000_000_000;
const saved = {
  enabled: process.env.CHAT_AI_ENABLED,
  key: process.env.XAI_API_KEY,
  base: process.env.XAI_API_BASE,
  model: process.env.XAI_MODEL,
};

function restoreEnv() {
  if (saved.enabled === undefined) delete process.env.CHAT_AI_ENABLED;
  else process.env.CHAT_AI_ENABLED = saved.enabled;
  if (saved.key === undefined) delete process.env.XAI_API_KEY;
  else process.env.XAI_API_KEY = saved.key;
  if (saved.base === undefined) delete process.env.XAI_API_BASE;
  else process.env.XAI_API_BASE = saved.base;
  if (saved.model === undefined) delete process.env.XAI_MODEL;
  else process.env.XAI_MODEL = saved.model;
}

function withoutKey() {
  delete process.env.CHAT_AI_ENABLED;
  delete process.env.XAI_API_KEY;
}

function question(text = "Wat is een loonsanctie?") {
  return [{ role: "user", content: text }];
}

function chat(extra: Record<string, unknown> = {}) {
  return {
    session: "sessie-1234567890",
    messages: question(),
    ip: "203.0.113.10",
    host: "www.arbopartnerbrabant.nl",
    origin: "https://arbopartnerbrabant.nl",
    ...extra,
  };
}

async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else out.push(full);
  }
  return out;
}

describe("ai-chat", () => {
  it("valt zonder sleutel terug en mailt een chatlead één keer", async () => {
    resetChatLimits();
    withoutKey();
    assert.equal(chatConfigured(), false);
    const sent: { subject?: string; text?: string }[] = [];
    const sendMail = async (mail: { subject?: string; text?: string }) => {
      sent.push(mail);
    };
    try {
      const first = await processChat(chat(), { now, sendMail });
      assert.equal(first.status, 200);
      assert.equal(first.payload.fallback, true);
      assert.equal(first.payload.reply, FALLBACK_TEXT);
      assert.equal(first.payload.action, undefined);
      assert.equal(sent.length, 0);

      const lead = await processChat(chat({
        session: "lead-sessie-001",
        ip: "203.0.113.20",
        messages: question("Mail mij op jan@voorbeeld.nl of bel 06-12345678"),
      }), { now, sendMail });
      assert.equal(lead.payload.fallback, true);
      assert.equal(sent.length, 1);
      assert.equal(sent[0].subject, LEAD_SUBJECT);
      assert.match(sent[0].text || "", /jan@voorbeeld.nl/);
      assert.match(sent[0].text || "", /0612345678/);
      assert.equal((sent[0].text || "").includes("XAI_API_KEY"), false);

      await processChat(chat({
        session: "lead-sessie-001",
        ip: "203.0.113.20",
        messages: question("Nog eens jan@voorbeeld.nl"),
      }), { now: now + 1, sendMail });
      assert.equal(sent.length, 1);

      await processChat(chat({
        session: "lead-sessie-002",
        ip: "203.0.113.21",
        messages: question("App maar met 06-50213593 of info@matchvermogen.nl"),
      }), { now, sendMail });
      assert.equal(sent.length, 1);
    } finally {
      restoreEnv();
    }
  });

  it("houdt de limiet per sessie, per IP en per dag aan", async () => {
    resetChatLimits();
    withoutKey();
    try {
      const session = "limiet-sessie-01";
      for (let index = 0; index < SESSION_LIMIT; index += 1) {
        const result = await processChat(chat({
          session,
          ip: "203.0.113.30",
          messages: question(`vraag ${index}`),
        }), { now: now + index });
        assert.equal(result.status, 200, `bericht ${index + 1}`);
      }
      const blocked = await processChat(chat({
        session,
        ip: "203.0.113.30",
        messages: question("te veel"),
      }), { now: now + SESSION_LIMIT });
      assert.equal(blocked.status, 429);
      assert.equal(blocked.payload.fallback, true);
      assert.equal(blocked.payload.reply, FALLBACK_TEXT);

      resetChatLimits();
      for (let index = 0; index < IP_LIMIT; index += 1) {
        const result = await processChat(chat({
          session: `ip-sessie-${String(index).padStart(4, "0")}`,
          ip: "198.51.100.8",
          messages: question("hoi"),
        }), { now });
        assert.equal(result.status, 200);
      }
      const ipBlocked = await processChat(chat({
        session: "ip-sessie-extra-1",
        ip: "198.51.100.8",
        messages: question("hoi"),
      }), { now });
      assert.equal(ipBlocked.status, 429);

      resetChatLimits();
      for (let index = 0; index < DAY_LIMIT; index += 1) {
        const result = await processChat(chat({
          session: `d${String(index).padStart(12, "0")}`,
          ip: `10.0.${Math.floor(index / 200)}.${index % 200}`,
          messages: question("hoi"),
        }), { now });
        assert.equal(result.status, 200);
      }
      const dayBlocked = await processChat(chat({
        session: "dag-limiet-extra",
        ip: "203.0.113.99",
        messages: question("hoi"),
      }), { now });
      assert.equal(dayBlocked.status, 429);
    } finally {
      restoreEnv();
      resetChatLimits();
    }
  });

  it("stuurt een tool-call naar xAI en houdt de sleutel uit het antwoord", async () => {
    resetChatLimits();
    process.env.CHAT_AI_ENABLED = "true";
    process.env.XAI_API_KEY = "test-sleutel-niet-loggen";
    delete process.env.XAI_API_BASE;
    delete process.env.XAI_MODEL;
    const seen: { url?: string; headers?: Record<string, string>; body?: string }[] = [];
    const fetchImpl = async (url: string, init: { headers: Record<string, string>; body: string; signal: AbortSignal }) => {
      seen.push({ url, headers: init.headers, body: init.body });
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            choices: [{
              message: {
                content: "",
                tool_calls: [{
                  function: {
                    name: "open_lead_form",
                    arguments: JSON.stringify({ reply: "Laat je gegevens achter, dan bellen we je." }),
                  },
                }],
              },
            }],
          };
        },
      };
    };
    try {
      assert.equal(chatConfigured(), true);
      const history = [
        { role: "assistant", content: "<b>opening</b>" },
        ...Array.from({ length: 11 }, (_item, index) => ({
          role: index % 2 === 0 ? "user" : "assistant",
          content: `bericht ${index} `.repeat(40),
        })),
        { role: "user", content: "<script>alert(1)</script> bel me terug" },
      ];
      const result = await processChat(chat({
        session: "tool-sessie-001",
        ip: "203.0.113.40",
        messages: history,
      }), { now, fetchImpl });
      assert.equal(result.status, 200);
      assert.equal(result.payload.fallback, undefined);
      assert.equal(result.payload.action, "lead_form");
      assert.match(result.payload.reply, /gegevens achter/);
      assert.equal(JSON.stringify(result).includes("test-sleutel-niet-loggen"), false);
      assert.equal(JSON.stringify(result).includes("api.x.ai"), false);
      assert.equal(seen.length, 1);
      assert.equal(seen[0].url, "https://api.x.ai/v1/chat/completions");
      assert.equal(seen[0].headers?.Authorization, "Bearer test-sleutel-niet-loggen");
      assert.match(seen[0].headers?.["x-grok-conv-id"] || "", /^[a-f0-9]{32}$/);
      const body = JSON.parse(seen[0].body || "{}");
      assert.equal(body.model, "grok-4.20-0309-non-reasoning");
      assert.equal(body.max_tokens, 350);
      assert.equal(body.temperature, 0.3);
      assert.equal(body.tools[0].function.name, "open_lead_form");
      assert.equal(body.messages[0].role, "system");
      assert.equal(body.messages.at(-1).role, "user");
      assert.ok(body.messages.length <= 11);
      assert.equal(JSON.stringify(body.messages.slice(1)).includes("<script>"), false);
      assert.equal(JSON.stringify(body).includes("test-sleutel-niet-loggen"), false);

      const logs: string[] = [];
      const original = console.error;
      console.error = (...args: unknown[]) => {
        logs.push(args.map(String).join(" "));
      };
      try {
        const broken = await processChat(chat({
          session: "tool-sessie-002",
          ip: "203.0.113.41",
          messages: question("tijd"),
        }), {
          now,
          timeoutMs: 20,
          fetchImpl: (_url: string, init: { signal: AbortSignal }) => new Promise((_resolve, reject) => {
            init.signal.addEventListener("abort", () => reject(new Error("test-sleutel-niet-loggen")));
          }),
        });
        assert.equal(broken.payload.fallback, true);
        assert.equal(broken.payload.reply, FALLBACK_TEXT);
        const http = await processChat(chat({
          session: "tool-sessie-003",
          ip: "203.0.113.42",
          messages: question("storing"),
        }), {
          now,
          fetchImpl: async () => ({ ok: false, status: 503, async json() { return {}; } }),
        });
        assert.equal(http.payload.fallback, true);
      } finally {
        console.error = original;
      }
      assert.equal(logs.some((line) => line.includes("test-sleutel-niet-loggen")), false);
    } finally {
      restoreEnv();
      resetChatLimits();
    }
  });

  it("weigert een andere origin en laat /api/chat het formulier", async () => {
    resetChatLimits();
    withoutKey();
    try {
      const foreign = await processChat(chat({ origin: "https://evil.example" }), { now });
      assert.equal(foreign.status, 403);
      assert.equal(foreign.payload.fallback, true);
      const trimmed = cleanHistory([
        { role: "assistant", content: "eerst" },
        ...Array.from({ length: 12 }, (_item, index) => ({
          role: index % 2 === 0 ? "user" : "assistant",
          content: `regel ${index}`,
        })),
      ]);
      assert.equal(trimmed.length <= 10, true);
      assert.equal(trimmed[0].role, "user");
      assert.equal(trimmed.at(-1)?.content, "regel 11");

      const res = {
        statusCode: 0,
        body: "",
        writeHead(status: number) { this.statusCode = status; },
        end(body: string) { this.body = body; },
      };
      const raw = Buffer.from(JSON.stringify({
        session: "via-handle-api",
        messages: question("hoi"),
      }));
      await handleApi({
        method: "POST",
        url: "/api/chat/message",
        headers: { host: "localhost" },
        async *[Symbol.asyncIterator]() { yield raw; },
      }, res);
      const payload = JSON.parse(res.body);
      assert.equal(res.statusCode, 200);
      assert.equal(payload.fallback, true);
      assert.equal(payload.errors, undefined);

      const form = {
        statusCode: 0,
        body: "",
        writeHead(status: number) { this.statusCode = status; },
        end(body: string) { this.body = body; },
      };
      const formRaw = Buffer.from(JSON.stringify({ naam: "H. Jansen", ...signStamp(Date.now() - 10_000) }));
      await handleApi({
        method: "POST",
        url: "/api/chat",
        headers: { host: "localhost" },
        async *[Symbol.asyncIterator]() { yield formRaw; },
      }, form);
      assert.equal(form.statusCode, 400);
      assert.match(form.body, /Veld ontbreekt/);
    } finally {
      restoreEnv();
    }
  });

  it("bouwt de kennisbank uit de eigen pagina's en laat de sleutel uit de frontend", async () => {
    const knowledge = buildKnowledge();
    const services = knowledge.match(/^- \/diensten\//gm) || [];
    assert.equal(services.length, 28);
    assert.match(knowledge, /\/diensten\/verzuimanalyse/);
    assert.match(knowledge, /\/diensten\/arbeidsdeskundig-onderzoek/);
    assert.match(knowledge, /\/spoedhulp/);
    assert.match(knowledge, /Gratis spoedscan van 30 minuten|spoedscan/i);
    assert.match(knowledge, /\/praktijkvoorbeelden\/fietsfabrikant-reorganisatie/);
    assert.match(knowledge, /\/praktijkvoorbeelden\/totaalanalyse-verzuim-erd/);
    assert.match(knowledge, /112,50/);
    assert.match(knowledge, /exclusief btw/);
    assert.match(knowledge, /995,00|€\s?995/);
    assert.match(knowledge, /Ontbreekt een verzuimsysteem/);
    assert.equal(knowledge.includes("api.x.ai"), false);
    const prompt = systemMessage({ pagePath: "/spoedhulp" });
    assert.match(prompt, /je en jij/);
    assert.match(prompt, /senior casemanagers/);
    assert.match(prompt, /ongeveer 5%/);
    assert.match(prompt, /12 jaar WGA/);
    assert.match(prompt, /085-0870307/);
    assert.match(prompt, /wa\.me\/31650213593/);
    assert.match(prompt, /openbaar/);
    assert.equal(prompt.includes("XAI_API_KEY"), false);
    assert.equal(prompt.includes("inclusief btw"), false);

    const roots = ["src", "public"];
    for (const root of roots) {
      for (const file of await files(root)) {
        if (file.endsWith(".webp") || file.endsWith(".avif") || file.endsWith(".png") || file.endsWith(".jpg")) continue;
        const source = await readFile(file, "utf8");
        assert.equal(source.includes("XAI_API_KEY"), false, file);
        assert.equal(source.includes("api.x.ai"), false, file);
        assert.equal(source.includes("Bearer"), false, file);
      }
    }
    const engage = await readFile("src/scripts/engage.ts", "utf8");
    const widget = await readFile("src/components/Engagement.astro", "utf8");
    assert.match(engage, /\/api\/chat\/message/);
    assert.match(engage, /sessionStorage/);
    assert.match(engage, /result\.fallback/);
    assert.match(engage, /lead_form/);
    assert.match(engage, /\/api\/chat"/);
    assert.match(widget, /Acuut verzuimprobleem\?/);
    assert.match(widget, /Wat kost een casemanager\?/);
    assert.match(widget, /Loonsanctie voorkomen/);
    assert.match(widget, /name="bron" value="chat"/);
    assert.match(widget, /company_website/);
    assert.match(await readFile("server/index.mjs", "utf8"), /\/api\/chat\/message/);
    assert.match(await readFile("server/vite-plugin.mjs", "utf8"), /\/api\/chat\/message/);
  });
});
