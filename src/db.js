const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  host: db.host,
  password: db.password,
  port: db.port,
  database: db.database,
});

module.exports = pool; // Export the pool object to be used in other files