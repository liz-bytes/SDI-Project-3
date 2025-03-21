/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('equipment_table', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('id_deployments');
    table.foreign('id_deployments').references('deployments_table.id').onDelete('CASCADE');
    table.string('status');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('equipment_table', table => {
    table.dropForeign('id_deployments')
  })
  .then(() => {
    return knex.schema.dropTableIfExists('equipment_table')
  })

};
