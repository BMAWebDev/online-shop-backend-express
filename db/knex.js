// const knex = require('knex');
// const knexfile = require('./knexfile');

import knex from "knex";
import knexfile from "./knexfile";

const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment];
const knexjs = knex(config);

// module.exports = knexjs;

export default {
  knex: knexjs,
};
