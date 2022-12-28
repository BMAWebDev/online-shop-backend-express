// !!! NOTE !!!
// Knexjs does not work with typescript and nodejs.
// When creating migrations, please use vanilla javascript

import { config } from "dotenv";
config({ path: "../../.env" });

const knexfileConfig = {
  development: {
    client: "mysql",
    connection: process.env.DB_URL,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "mysql",
    connection: process.env.DB_URL,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
    // IMPORTANT: running seeds on production environments are disabled
    // add them only if you really know what you are doing
  },
};

export default knexfileConfig;
