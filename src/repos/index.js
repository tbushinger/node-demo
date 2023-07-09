import { SQLLiteRepo } from "./sqllite.js";

export const RepoProviders = {
    SQLLite: "SQLLite",
}

export function createRepo(provider, options) {
    if (provider === RepoProviders.SQLLite) {
        return new SQLLiteRepo(options);
    } // Add other repo providers here

    return new SQLLiteRepo(options);
}