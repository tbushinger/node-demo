import { internalServerError, statusCodes } from "./status.codes.js";

function createResult(status, data = undefined) {
    return {
        status,
        data
    };
}

function createErrorResult(error) {
    // For internal server errors, we don't want to expose the error stack to the client
    // However, we can log the error to the backend log
    console.log(error);
    return createResult(statusCodes.Internal, { message: internalServerError });
}

function createPopulationNotFoundResult(state, city) {
    return createResult(statusCodes.NotFound, { message: `Population for state "${state}" and city "${city}" not found!`});
}

export class PopulationService {
    #repo = null;

    constructor(repo) {
        this.#repo = repo;
    }

    dispose() {
        if (this.#repo) {
            this.#repo.dispose();
            this.#repo = null;
        }
    }

    async getPopulation(state, city) {
        try {
            const population = await this.#repo.getPopulation(state, city);
            if (population) {
                return createResult(statusCodes.Found, population);
            }

            return createPopulationNotFoundResult(state, city);
        } catch (err) {
            return createErrorResult(err);
        }
    }

    async setPopulation(state, city, population) {
        try {
            const repo = this.#repo;
            const currentPopulation = await repo.getPopulation(state, city);

            if (currentPopulation) {
                if (currentPopulation === population) {
                    return createResult(statusCodes.Found, currentPopulation);
                }

                await repo.updatePopulation(state, city, population);
                return createResult(statusCodes.Found, true);
            }

            await repo.createPopulation(state, city, population);
            return createResult(statusCodes.Created, true);
        } catch (err) {
            return createErrorResult(err);
        }
    }
}