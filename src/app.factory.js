import { App } from "./app.js";
import { setupRoutes } from "./app.routes.js";

export async function appFactory(worker) {
    const app = new App({ port: 3000, logger: true });

    setupRoutes(app.server());

    const url = await app.listen();

    console.log("Server ready at %s on worker %o", url, worker);
}