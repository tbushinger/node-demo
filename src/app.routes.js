export function setupRoutes (server) {
    server.get("/", (request, reply) => {
        const { hostname, ip } = request;
        reply.send({ hostname, ip });
    })
}