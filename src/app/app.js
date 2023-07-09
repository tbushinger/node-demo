import { fastify } from "fastify"

export class App {
    #server = null;
    #appOptions = {};

    constructor (appOptions, serverOptions) {
        this.#appOptions = appOptions;
        this.#server = fastify(serverOptions);
    }

    async listen () {
        return this.#server.listen(this.#appOptions);
    }

    server() {
        return this.#server;
    }
}