import { fastify } from "fastify"

export class App {
    #server = null;
    #appOptions = {};

    constructor (appOptions = { port: 3000 }, serverOptions = {  logger: true }) {
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