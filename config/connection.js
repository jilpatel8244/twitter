const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
}).promise();

module.exports = connection;