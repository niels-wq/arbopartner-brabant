import { handleChatMessage } from "./chat-ai.mjs";
import { handleApi } from "./forms.mjs";

export function formApiPlugin() {
  return {
    name: "arbopartner-form-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
        if (url.pathname === "/api/chat/message") {
          await handleChatMessage(req, res);
          return;
        }
        const handled = await handleApi(req, res);
        if (!handled) next();
      });
    },
  };
}
