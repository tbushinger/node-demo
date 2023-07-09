import { SQLLiteRepo } from "./impl/sqllite.js";

export const RepoProviders = {
    SQLLite: "SQLLite",
}

export function createRepo(type, options) {
    if (type === RepoProviders.SQLLite) {
        return new SQLLiteRepo(options);
    } // Add other repo providers here

    return new SQLLiteRepo(options);
}