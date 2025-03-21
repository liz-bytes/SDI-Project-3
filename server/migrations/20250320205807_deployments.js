/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('deployments_table', (table) => {
    table.increments('id').primary();
    table.string('location');
    table.string('name');
    table.integer('id_units')
    table.foreign('id_units').references('units_table.id').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('deployments_table', table => {
    table.dropForeign('id_units')
  })
  .then(() => {
    return knex.schema.dropTableIfExists('deployments_table')
  })
};
