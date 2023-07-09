import { createRepo, RepoProviders } from "./src/repos/index.js";
import { createService, ServiceProviders } from "./src/services/index.js"

import Path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);


async function main() {
  const url = Path.resolve(__dirname, "./db/city_populations.db");
  const populationRepo = createRepo(RepoProviders.SQLLite, { url });
  const populationService = createService(ServiceProviders.Population, populationRepo);

  let result = await populationService.getPopulation("Florida", "Oviedo");
  console.log(result);

  result = await populationService.getPopulation("Guam", "Guam");
  console.log(result);

  result = await populationService.setPopulation("Guam", "Guam", 150000);
  console.log(result);

  result = await populationService.getPopulation("Guam", "Guam");
  console.log(result);

  result = await populationService.setPopulation("Guam", "Guam", 3000000);
  console.log(result);

  result = await populationService.getPopulation("Guam", "Guam");
  console.log(result);

  populationService.dispose();
}

main();