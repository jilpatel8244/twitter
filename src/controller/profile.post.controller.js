const connection = require('../../config/connection');

exports.getPosts = async (req,res) =>{
  try{
    
    let id = req.user[0][0].id;
    console.log(id);
    
    const postDataQuery = `SELECT u.name, u.username, t.id, t.user_id, t.content, t.is_drafted, t.is_posted, t.created_at FROM users as u INNER JOIN tweets as t ON u.id = t.user_id WHERE u.id=?`;
    const [postData] = await connection.query(postDataQuery,[id]);
    console.log(postData);

    return res.json({postData});

  }catch(error){
    console.log(error);
  }
}