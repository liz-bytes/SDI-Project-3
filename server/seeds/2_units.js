/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units_table').del()
  await knex('units_table').insert([
    {id: 1, location: 'Fort Bragg, NC', name: '1st Shadow Brigade'},
    {id: 2, location: 'Nellis AFB, NV', name: '157th Oblivion Wing'},
    {id: 3, location: 'Fort Bragg, NC', name: '35th Nexus HyperNet Battalion'},
    {id: 4, location: 'Lunar Nexus Base, The Moon', name: '2-503rd Shock IN Battalion'},
    {id: 5, location: 'Chrono Bastion, LP3', name: 'Deep Space Temporal Command Center'},
    {id: 6, location: 'Chrono Bastion, LP3', name: 'Temporal Vanguard Division'},
    {id: 7, location: 'Chrono Bastion, LP3', name: 'Void Operations and Reconnaissance Group'}
  ]);
};
