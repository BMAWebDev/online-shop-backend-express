// const { config } = require("dotenv");
// config({ path: "../.env" });

import { config } from "dotenv";
config({ path: "../.env" });

// module.exports = {
export default {
  development: {
    client: "pg",
    connection: "pg://postgres:admin@localhost:5432/online_shop",
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
    connection: process.env.DATABASE_URL,
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
