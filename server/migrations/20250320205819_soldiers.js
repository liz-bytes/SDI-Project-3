/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('soldiers_table', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.integer('id_deployments')
    table.foreign('id_deployments').references('deployments_table.id').onDelete('CASCADE');
    table.integer('home_unit');
    table.foreign('home_unit').references('units_table.id').onDelete('CASCADE');
    table.integer('id_mos');
    table.foreign('id_mos').references('mos_table.id').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('soldiers_table', table => {
    table.dropForeign('id_deployments');
    table.dropForeign('home_unit');
    table.dropForeign('id_mos');
  })
  .then(() => {
    return knex.schema.dropTableIfExists('soldiers_table')
  })
};
