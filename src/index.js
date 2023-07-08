import { AppCluster } from "./app.cluster.js";
import { appFactory } from "./app.factory.js";

const appCluster = new AppCluster(appFactory);

appCluster.run();