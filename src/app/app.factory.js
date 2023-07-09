import { App } from "./app.js";

export async function appFactory(worker, registerRoutes, appOptions, serverOptions) {
    const app = new App(appOptions, serverOptions);

    registerRoutes(app.server());

    const url = await app.listen();

    console.log("Server ready at %s on worker %o", url, worker);
}

export function createAppFactory(
    registerRoutes,
    appOptions = { port: 3000 },
    serverOptions = { logger: true },
) {
    return (worker) => {
        appFactory(worker, registerRoutes, appOptions, serverOptions);
    };
}