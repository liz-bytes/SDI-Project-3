/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE deployments_table RESTART IDENTITY CASCADE');

  // Get relevant unit IDs from units_table
  const units = await knex('units_table').whereIn('name', [
    'Deep Space Temporal Command Center',
    '1st Shadow Brigade',
    '101st Phantom Battalion',
    '102nd Dusk Raiders',
    '103rd Obsidian Ghosts',
    '2nd Temporal Vanguard Brigade',
    '201st Chrono Lancers',
    '202nd Riftwalkers',
    '203rd Celestial Watch',
    '3rd Void Recon Brigade',
    '301st Spectral Blades',
    '302nd Abyss Stalkers',
    '303rd Eclipse Wardens'
  ]);

  const unitMap = units.reduce((acc, unit) => {
    acc[unit.name] = unit.id;
    return acc;
  }, {});

  await knex('deployments_table').insert([
    {name: 'Operation Rift Sentinel', location: 'The Rift Expanse', id_units: unitMap['201st Chrono Lancers'] },
    {name: 'Operation Titan’s Descent', location: 'Agartha', id_units: unitMap['102nd Dusk Raiders'] },
    {name: 'Operation Phantom Veil', location: 'Shadow Realm', id_units: unitMap['103rd Obsidian Ghosts'] },
    {name: 'Operation Void Genesis', location: 'Exo-Prime Omega', id_units: unitMap['202nd Riftwalkers'] },
    {name: 'Operation Eclipse Watch', location: 'Deep Space Observation Post Sigma-12', id_units: unitMap['Deep Space Temporal Command Center'] },
    {name: 'Operation Chrono Storm', location: 'Sirius Gate', id_units: unitMap['2nd Temporal Vanguard Brigade'] },
    {name: 'Operation Abyss Walker', location: 'Uncharted Space – Zone Omega', id_units: unitMap['302nd Abyss Stalkers'] },
    {name: 'Operation Nexus Breaker', location: 'Temporal Convergence Point Alpha-9', id_units: unitMap['203rd Celestial Watch'] },
    {name: 'Operation Celestial Beacon', location: 'The Lost Colony of Nyx-7', id_units: unitMap['3rd Void Recon Brigade'] },
    {name: 'Operation Paradox Rift', location: 'Chrono Ruins of Epsilon Prime', id_units: unitMap['301st Spectral Blades'] },
    {name: 'Operation Silent Horizon', location: 'Abandoned Starlight Citadel', id_units: unitMap['101st Phantom Battalion'] },
    {name: 'Operation Obsidian Ghost', location: 'Orbital Outpost X-99', id_units: unitMap['303rd Eclipse Wardens'] },
    {name: 'Operation Null Horizon', location: 'Temporal Dead Zone Theta-7', id_units: unitMap['1st Shadow Brigade'] }


  ]);
};
