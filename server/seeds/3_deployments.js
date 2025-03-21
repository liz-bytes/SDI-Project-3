exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('deployments_table').del();

  // Get unit IDs from `units_table`
  const units = await knex('units_table')
    .whereIn('name', [
      'Temporal Vanguard Division',
      'Void Operations and Reconnaissance Group',
      '157th Oblivion Wing',
      '1st Shadow Brigade',
      '35th Nexus HyperNet Battalion',
      '2-503rd Shock IN Battalion',
      'Deep Space Temporal Command Center'
    ]);

  const unitMap = units.reduce((acc, unit) => {
    acc[unit.name] = unit.id;
    return acc;
  }, {});

  await knex('deployments_table').insert([
    { id: 1, name: 'Operation Rift Sentinel', location: 'The Rift Expanse', id_units: unitMap['Temporal Vanguard Division'] },
    { id: 2, name: 'Operation Titan’s Descent', location: 'Agartha', id_units: unitMap['1st Shadow Brigade'] },
    { id: 3, name: 'Operation Phantom Veil', location: 'Shadow Realm', id_units: unitMap['157th Oblivion Wing'] },
    { id: 4, name: 'Operation Void Genesis', location: 'Exo-Prime Omega', id_units: unitMap['35th Nexus HyperNet Battalion'] },
    { id: 5, name: 'Operation Eclipse Watch', location: 'Deep Space Observation Post Sigma-12', id_units: unitMap['Deep Space Temporal Command Center'] },
    { id: 6, name: 'Operation Chrono Storm', location: 'Sirius Gate', id_units: unitMap['2-503rd Shock IN Battalion'] },
    { id: 7, name: 'Operation Abyss Walker', location: 'Uncharted Space – Zone Omega', id_units: unitMap['Void Operations and Reconnaissance Group'] },
    { id: 8, name: 'Operation Nexus Breaker', location: 'Temporal Convergence Point Alpha-9', id_units: unitMap['35th Nexus HyperNet Battalion'] },
    { id: 9, name: 'Operation Celestial Beacon', location: 'The Lost Colony of Nyx-7', id_units: unitMap['Temporal Vanguard Division'] },
    { id: 10, name: 'Operation Paradox Rift', location: 'Chrono Ruins of Epsilon Prime', id_units: unitMap['Void Operations and Reconnaissance Group'] },
    { id: 11, name: 'Operation Silent Horizon', location: 'Abandoned Starlight Citadel', id_units: unitMap['1st Shadow Brigade'] },
    { id: 12, name: 'Operation Obsidian Ghost', location: 'Orbital Outpost X-99', id_units: unitMap['157th Oblivion Wing'] }
  ]);
};
