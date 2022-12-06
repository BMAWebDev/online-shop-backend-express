import knex from "knex";
import knexfile from "./knexfile";

const environment = process.env.NODE_ENV ? "production" : "development";
const config = knexfile[environment];
const knexjs = knex(config);

export default {
  knex: knexjs,
};
