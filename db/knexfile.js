const { config } = require('dotenv');
config({ path: '../.env' });

module.exports = {
  development: {
    client: 'postgres',
    connection: 'pg://postgres:admin@localhost:5432/daw_bonus',
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    // IMPORTANT: running seeds on production environments are disabled
    // add them only if you really know what you are doing
  },
};
