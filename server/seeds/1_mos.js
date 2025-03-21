/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mos_table').del()
  await knex('mos_table').insert([
    {id: 1, name: 'Dimensional Starship Door Gunner'},
    {id: 2, name: 'Dimensional Starship Pilot'},
    {id: 3, name: 'Dimensional Paratrooper'},
    {id: 4, name: 'Dimensional Starship Mechanic'},
    {id: 5, name: 'Dimensional IT Specialist'},
    {id: 6, name: 'Dimensional Commander'},
    {id: 7, name: 'Dimensional Supply Specialist'},
    {id: 8, name: 'Dimensional Transport'},
    {id: 9, name: 'Dimensional Armor'},
    {id: 10, name: 'Dimensional Operator'}
  ]);
};
