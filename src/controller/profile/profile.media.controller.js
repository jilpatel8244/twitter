const connection = require('../../../config/connection');

exports.getProfileMedia = async (req, res) => {
  try{
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }
    console.log("Here is the id:",id);
    let sql = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id = t.user_id INNER JOIN medias as m ON t.id=m.tweet_id WHERE u.id = ?`;
    let [result] = await connection.query(sql,[id]);
    console.log(result);
    return res.json({ media: result });
  }catch(error){
    console.log(error);
    res.json({ message: "Something Went Wrong!"});
  }
};