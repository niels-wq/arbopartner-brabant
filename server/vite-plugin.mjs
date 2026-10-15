import { handleApi } from "./forms.mjs";

export function formApiPlugin() {
  return {
    name: "arbopartner-form-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handleApi(req, res);
        if (!handled) next();
      });
    },
  };
}
