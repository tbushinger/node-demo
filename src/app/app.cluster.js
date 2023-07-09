import cluster from 'node:cluster';
import * as os from "os";

const CPUS = 1; // os.cpus().length;

export class AppCluster {
    #appFactory = null;

    constructor(appFactory) {
        this.#appFactory = appFactory;
    }

    run() {
        if (cluster.isPrimary) {
            this.primary();
        } else {
            this.worker();
        }
    }

    primary() {
        console.log("Total Number of Cores: %o", CPUS)
        console.log("Main %o is running", process.pid)

        for (let i = 0; i < CPUS; i++) {
            const fork = cluster.fork();
            setTimeout(() => {
                fork.send(i);
            }, 1000);
        }

        cluster.on("online", (worker) => {
            console.log("Worker %o is listening", worker.process.pid)
        })

        cluster.on("exit", (worker) => {
            console.log("Worker %o died", worker.process.pid)
        })
    }

    worker() {
        const cb = (index) => {
            process.off("message", cb)
            console.log("Worker %o started", process.pid)
            this.#appFactory(index)
        }

        process.on("message", cb)
    }
}