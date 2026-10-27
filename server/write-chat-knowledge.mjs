import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildKnowledge } from "./chat-prompt.mjs";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "chat-knowledge.json");
const text = buildKnowledge();
if (!text.includes("/diensten/") || text.length < 500) {
  console.error("[chat] kennisbank is te klein");
  process.exit(1);
}
writeFileSync(file, JSON.stringify({ text }));
console.log(`[chat] kennisbank geschreven (${text.length} tekens)`);
