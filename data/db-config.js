const knex = require("knex");

const config = require("../knexfile.js");

// deployment
const environment = process.env.NODE_ENV || "development";

// testing
// const environment = process.env.DB_ENV || "development";

module.exports = knex(config[environment]);
