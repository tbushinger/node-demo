import { AppCluster } from "./app.cluster.js";
import { createAppFactory } from "./app.factory.js";
import { createRepo, RepoProviders } from "./repos/index.js";
import { createService, ServiceProviders } from "./services/index.js";
import registerRoutes from "./routes/index.js";

import Path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const appFactory = createAppFactory((server) => {
    const url = Path.resolve(__dirname, "../db/city_populations.db");

    // Repos
    const populationRepo = createRepo(RepoProviders.SQLLite, { url });
    
    // Services
    const populationService = createService(ServiceProviders.Population, populationRepo);
  
    // Routes
    registerRoutes(server, { populationService }, "/api/population");
});

const appCluster = new AppCluster(appFactory);

appCluster.run();