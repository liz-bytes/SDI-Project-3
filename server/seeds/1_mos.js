/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE mos_table RESTART IDENTITY CASCADE');
  await knex('mos_table').insert([
    {name: 'Dimensional Starship Door Gunner'},
    {name: 'Dimensional Starship Pilot'},
    {name: 'Dimensional Paratrooper'},
    {name: 'Dimensional Starship Mechanic'},
    {name: 'Dimensional IT Specialist'},
    {name: 'Dimensional Commander'},
    {name: 'Dimensional Supply Specialist'},
    {name: 'Dimensional Transport'},
    {name: 'Dimensional Armor'},
    {name: 'Dimensional Operator'}
  ]);
};
