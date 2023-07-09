import { AppCluster } from "./app/app.cluster.js";
import { createAppFactory } from "./app/app.factory.js";
import { createRepo, RepoProviders } from "./repos/index.js";
import { createService, ServiceProviders } from "./services/index.js";
import registerRoutes from "./routes/index.js";

import Path from "path";
import { fileURLToPath } from 'url';

// This section is needed to support ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

// Environment Vars
const env = process.env;
const maxWorkers = (env.MAX_WORKERS) ? parseInt(env.MAX_WORKERS) : 0;  // Zero would indicaate use all available cores
const logger = (env.ENABLE_LOGGING) ? (env.ENABLE_LOGGING === "true") : false; 
const port = env.PORT || 5555;
const repoProvider = env.DB_PROVIDER || "SQLLite";
const repoUrl = env.DB_URL || Path.resolve(__dirname, "../db/city_populations.db");

const appOptions = { port };
const serverOptions = { logger };

const appFactory = createAppFactory((server) => {
    // Route Registration and config

    // Repos
    const populationRepo = createRepo(repoProvider, { url: repoUrl });
    
    // Services
    const populationService = createService(ServiceProviders.Population, populationRepo);
  
    // Routes
    registerRoutes(server, { populationService }, "/api/population");
}, appOptions, serverOptions);

const appCluster = new AppCluster(appFactory, { maxWorkers });

appCluster.run();