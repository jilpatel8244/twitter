const mysql = require("mysql2");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:process.env.PASSWORD || "password",
    database: process.env.DB_NAME || 'temp_twitter',
    dateStrings: true
}).promise();

module.exports = connection;
