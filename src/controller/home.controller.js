const connection = require("../../config/connection");

exports.getHome = async (req, res) => {
  let sql = 'SELECT * FROM tweets';
  const [rows, fields] = await connection.execute(sql);
  res.render('../views/pages/home', { tweets: rows });
} 
