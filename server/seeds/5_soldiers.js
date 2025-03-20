exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('soldiers_table').del();

  // Fetch deployments
  const deployments = await knex('deployments_table').select('id', 'name');
  const deploymentMap = deployments.reduce((acc, dep) => {
    acc[dep.name] = dep.id;
    return acc;
  }, {});

  // Fetch MOS (Military Occupational Specialties)
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

  await knex('soldiers_table').insert([
    // Commanders
    { first_name: 'Michael', last_name: 'Thompson', id_deployments: deploymentMap['Operation Chrono Storm'], home_unit: unitMap['Deep Space Temporal Command Center'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Elizabeth', last_name: 'Santiago', id_deployments: deploymentMap['Operation Paradox Rift'], home_unit: unitMap['Temporal Vanguard Division'], id_mos: mosMap['Dimensional Commander'] },
    { first_name: 'Devrin', last_name: 'Nguyen', id_deployments: deploymentMap['Operation Obsidian Ghost'], home_unit: unitMap['Void Operations and Reconnaissance Group'], id_mos: mosMap['Dimensional Commander'] },

    // Additional Soldiers
    { first_name: 'Ryan', last_name: 'Cole', id_deployments: deploymentMap['Operation Rift Sentinel'], home_unit: unitMap['1st Shadow Brigade'], id_mos: mosMap['Dimensional Paratrooper'] },
    { first_name: 'Ava', last_name: 'Montoya', id_deployments: deploymentMap['Operation Nexus Breaker'], home_unit: unitMap['35th Nexus HyperNet Battalion'], id_mos: mosMap['Dimensional IT Specialist'] },
    { first_name: 'Jordan', last_name: 'Xiang', id_deployments: deploymentMap['Operation Celestial Beacon'], home_unit: unitMap['2-503rd Shock IN Battalion'], id_mos: mosMap['Dimensional Armor'] },
    { first_name: 'Isabella', last_name: 'Carter', id_deployments: deploymentMap['Operation Eclipse Watch'], home_unit: unitMap['Deep Space Temporal Command Center'], id_mos: mosMap['Dimensional Transport'] },
    { first_name: 'Dante', last_name: 'Vega', id_deployments: deploymentMap['Operation Abyss Walker'], home_unit: unitMap['Void Operations and Reconnaissance Group'], id_mos: mosMap['Dimensional Operator'] },
    { first_name: 'Sophia', last_name: 'Hale', id_deployments: deploymentMap['Operation Silent Horizon'], home_unit: unitMap['1st Shadow Brigade'], id_mos: mosMap['Dimensional Supply Specialist'] },
    { first_name: 'Ethan', last_name: 'Reed', id_deployments: deploymentMap['Operation Phantom Veil'], home_unit: unitMap['157th Oblivion Wing'], id_mos: mosMap['Dimensional Starship Pilot'] },
    { first_name: 'Liam', last_name: 'Takahashi', id_deployments: deploymentMap['Operation Titan’s Descent'], home_unit: unitMap['35th Nexus HyperNet Battalion'], id_mos: mosMap['Dimensional Starship Mechanic'] },
    { first_name: 'Emily', last_name: 'Ortega', id_deployments: deploymentMap['Operation Void Genesis'], home_unit: unitMap['2-503rd Shock IN Battalion'], id_mos: mosMap['Dimensional Starship Door Gunner'] }
  ]);
};
