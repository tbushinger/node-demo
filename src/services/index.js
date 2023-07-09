import { PopulationService } from "./population.js";

export const ServiceProviders = {
    Population: "Population",
}

export function createService(provider, repo) {
    if (provider === ServiceProviders.Population) {
        return new PopulationService(repo);
    } // Add other services here

    return new PopulationService(repo);
}