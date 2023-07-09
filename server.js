async function main() {
  const url = Path.resolve(__dirname, "../../../db/city_populations.db");

  const repo = new SQLLiteRepo({ url });

  let population = await repo.getPopulation("Florida", "Oviedo");
  console.log(population);

  population = await repo.getPopulation("Guam", "Guam");
  console.log(population);

  await repo.createPopulation("Guam", "Guam", 150000);

  population = await repo.getPopulation("Guam", "Guam");
  console.log(population);

  await repo.updatePopulation("Guam", "Guam", 300000);

  population = await repo.getPopulation("Guam", "Guam");
  console.log(population);

  repo.dispose();
}

main();