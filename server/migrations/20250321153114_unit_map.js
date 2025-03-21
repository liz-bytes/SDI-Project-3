/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('units_map_table', (table) => {
    table.increments('id').primary();
    table.integer('brigade')
    table.foreign('brigade').references('units_table.id').onDelete('CASCADE');
    table.integer('battalion');
    table.foreign('battalion').references('units_table.id').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('units_map_table', table => {
    table.dropForeign('id_battalion');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('units_map_table')
  })
};
