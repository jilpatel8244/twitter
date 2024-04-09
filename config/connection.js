const mysql = require("mysql2");
require("dotenv").config();

var connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "temp_twitter",
  })
  .promise();

module.exports = connection;
