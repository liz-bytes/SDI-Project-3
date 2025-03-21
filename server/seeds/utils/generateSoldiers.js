// utils/generateSoldiers.js
const { faker } = require('@faker-js/faker');

function generateSoldiers(count, unitMap, deploymentMap, mosMap) {
  const unitNames = Object.keys(unitMap);
  const deploymentNames = Object.keys(deploymentMap);
  const mosNames = Object.keys(mosMap);

  const soldiers = [];

  for (let i = 0; i < count; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const homeUnit = unitMap[faker.helpers.arrayElement(unitNames)];
    const deployment = deploymentMap[faker.helpers.arrayElement(deploymentNames)];
    const mos = mosMap[faker.helpers.arrayElement(mosNames)];

    soldiers.push({
      first_name,
      last_name,
      home_unit: homeUnit,
      id_deployments: deployment,
      id_mos: mos
    });
  }

  return soldiers;
}

module.exports = generateSoldiers;
