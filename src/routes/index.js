import registerPopulationRoutes from "./population.js";

export default function registerRoutes(server, services = {}) {
    registerPopulationRoutes(server, services.populationService);
}