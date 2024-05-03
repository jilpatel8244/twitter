const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD || "password",
    database: process.env.DB_NAME || "twitter",

}).promise();

module.exports = connection;
