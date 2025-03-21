/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE units_map_table RESTART IDENTITY CASCADE');
  await knex('units_map_table').insert([
    {brigade: 2, battalion: 3},
    {brigade: 2, battalion: 4},
    {brigade: 2, battalion: 5},
    {brigade: 6, battalion: 7},
    {brigade: 6, battalion: 8},
    {brigade: 6, battalion: 9},
    {brigade: 10, battalion: 11},
    {brigade: 10, battalion: 12},
    {brigade: 10, battalion: 13}
  ]);
};
