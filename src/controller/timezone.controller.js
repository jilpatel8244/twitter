const connection = require('../../config/connection');

exports.getTimeZone = async (req, res) => {
  try {
    let id = req.body.id || 2;
    let createdAtQuery = `SELECT u.created_at,c.name FROM users as u INNER JOIN countries as c ON u.country_id = c.id where u.id=?`;
    let [createdAtData] = await connection.query(createdAtQuery,[id]);
    console.log(createdAtData[0].created_at);
    res.render('../views/pages/timezone',{createdAtData});
  } catch (error) {
    console.log(error);
  }
}