const connection = require('../../config/connection');

exports.getLikes = async (req,res) =>{
  try{
    let id=req.user[0][0].id;
    console.log(id);

    const likesDataQuery = `SELECT * FROM users as u INNER JOIN tweet_likes as tl ON u.id = tl.user_id WHERE u.id = ? `;
    const [likesData] = await connection.query(likesDataQuery, [id]);
    console.log(likesData[0]);
    return res.json({likesData});
    
  }catch(error){
    console.log(error);
  }
}