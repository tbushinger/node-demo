import { App } from "./app.js";

export async function appFactory(worker, registerRoutes) {
    const app = new App({ port: 3000, logger: true });

    registerRoutes(app.server());

    const url = await app.listen();

    console.log("Server ready at %s on worker %o", url, worker);
}

export function createAppFactory(registerRoutes) {
    return (worker) => {
        appFactory(worker, registerRoutes);
    };
}