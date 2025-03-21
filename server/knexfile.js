// Update with your config settings.


//    995bc2d2bb9e   postgres   "docker-entrypoint.s…"   6 seconds ago   Up 6 seconds   0.0.0.0:5432->5432/tcp   db


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'sentinel_db'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
