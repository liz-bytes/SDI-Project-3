/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    //connection: process.env.DB_CONNECTION_STRING, //Works once docker-compose is spun up
    connection: {
        host: 'host.docker.internal',
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
