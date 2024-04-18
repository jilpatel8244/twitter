const connection = require('../../config/connection');

exports.getReplies = async (req,res) =>{
  try{

    console.log("HEllo");
    let id = req.user[0][0].id;
    console.log(id);

    const repliesDataQuery = `SELECT * FROM users as u INNER JOIN retweets as rt ON u.id = rt.user_id WHERE u.id=?`;
    const [repliesData] = await connection.query(repliesDataQuery,[id]);
    return res.json({repliesData})
 
  }catch(error){
    console.log(error);
  }
}