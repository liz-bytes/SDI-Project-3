/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const generateSoldiers = require('./utils/generateSoldiers');


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE soldiers_table RESTART IDENTITY CASCADE');
  // Fetch deployments
  const deployments = await knex('deployments_table').select('id', 'name');
  const deploymentMap = deployments.reduce((acc, dep) => {
    acc[dep.name] = dep.id;
    return acc;
  }, {});

  // Fetch MOS
  const mos = await knex('mos_table').select('id', 'name');
  const mosMap = mos.reduce((acc, m) => {
    acc[m.name] = m.id;
    return acc;
  }, {});

  // Fetch Units
  const units = await knex('units_table').select('id', 'name');
  const unitMap = units.reduce((acc, unit) => {
    acc[unit.name] = unit.id;
    return acc;
  }, {});

  // Generate 10,000 random soldiers
  const randomSoldiers = generateSoldiers(250, unitMap, deploymentMap, mosMap);

  // Commanders (12 total: 1 DIV, 3 BDE, 9 BN)
  const baseCommanders = [
    { first_name: 'Michael', last_name: 'Thompson', id_deployments: deploymentMap['Operation Chrono Storm'], home_unit: unitMap['Deep Space Temporal Command Center'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Elizabeth', last_name: 'Santiago', id_deployments: deploymentMap['Operation Paradox Rift'], home_unit: unitMap['2nd Temporal Vanguard Brigade'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Lucien', last_name: 'Crowe', id_deployments: deploymentMap['Operation Silent Horizon'], home_unit: unitMap['1st Shadow Brigade'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Kira', last_name: 'Morgan', id_deployments: deploymentMap['Operation Abyss Walker'], home_unit: unitMap['3rd Void Recon Brigade'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Devrin', last_name: 'Nguyen', id_deployments: deploymentMap['Operation Obsidian Ghost'], home_unit: unitMap['303rd Eclipse Wardens'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Amira', last_name: 'Stone', id_deployments: deploymentMap['Operation Phantom Veil'], home_unit: unitMap['103rd Obsidian Ghosts'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Victor', last_name: 'Ramirez', id_deployments: deploymentMap['Operation Titan’s Descent'], home_unit: unitMap['102nd Dusk Raiders'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Natalia', last_name: 'Reyes', id_deployments: deploymentMap['Operation Celestial Beacon'], home_unit: unitMap['203rd Celestial Watch'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Tariq', last_name: 'Bennett', id_deployments: deploymentMap['Operation Rift Sentinel'], home_unit: unitMap['201st Chrono Lancers'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Mei', last_name: 'Yamato', id_deployments: deploymentMap['Operation Void Genesis'], home_unit: unitMap['202nd Riftwalkers'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Griffin', last_name: 'Solari', id_deployments: deploymentMap['Operation Nexus Breaker'], home_unit: unitMap['301st Spectral Blades'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Rafael', last_name: 'Draven', id_deployments: deploymentMap['Operation Eclipse Watch'], home_unit: unitMap['101st Phantom Battalion'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Zach', last_name: 'Brown', id_deployments: deploymentMap['Operation Null Horizon'], home_unit: unitMap['302nd Abyss Stalkers'], id_mos: mosMap['Dimensional Commander'] },
  ];

  // Insert commanders + random soldiers
  await knex('soldiers_table').insert([...baseCommanders, ...randomSoldiers]);
};
