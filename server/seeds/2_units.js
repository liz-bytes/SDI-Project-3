/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE units_table RESTART IDENTITY CASCADE');

  await knex('units_table').insert([
    // Headquarters
    {location: 'Earth', name: 'Deep Space Temporal Command Center' },

    // === 1st Shadow Brigade & its BNs ===
    {location: 'Chrono Bastion, LP3', name: '1st Shadow Brigade' },

    {location: 'Titan Forward Outpost', name: '101st Phantom Battalion' },
    {location: 'Agartha Operations Hub', name: '102nd Dusk Raiders' },
    {location: 'Pluto Blacksite Theta-9', name: '103rd Obsidian Ghosts' },

    // === 2nd Temporal Vanguard Brigade & its BNs ===
    {location: 'Chrono Bastion, LP3', name: '2nd Temporal Vanguard Brigade' },

    {location: 'Sirius Gate Relay Station', name: '201st Chrono Lancers' },
    {location: 'Epsilon Prime Drop Zone', name: '202nd Riftwalkers' },
    {location: 'Nyx-7 Arcology Perimeter', name: '203rd Celestial Watch' },

    // === 3rd Void Recon Brigade & its BNs ===
    {location: 'Chrono Bastion, LP3', name: '3rd Void Recon Brigade' },

    {location: 'Echo-7 Listening Post', name: '301st Spectral Blades' },
    {location: 'Uncharted Space – Zone Omega', name: '302nd Abyss Stalkers' },
    {location: 'Event Horizon Station', name: '303rd Eclipse Wardens' }
  ]);
};
