const connection = require('../../config/connection');

exports.getPosts = async (req,res) =>{
  try{
    
    let id = req.user[0][0].id;
    console.log(id);
    
    const postDataQuery = `SELECT u.name, u.username,u.profile_img_url as profileImage, u.cover_img_url, t.id, t.user_id, t.content, t.is_drafted, t.is_posted, t.created_at, m.media_url 
    as media FROM users as u INNER JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id WHERE u.id=? ORDER BY t.created_at DESC`;
    const [postData] = await connection.query(postDataQuery,[id]);
    console.log("This is post data :",postData);
    

    return res.json({postData});

  }catch(error){
    console.log(error);
  }
}