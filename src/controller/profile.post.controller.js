const connection = require('../../config/connection');

exports.getPosts = async (req,res) =>{
  try{
    
    let id = req.user[0][0].id;
    
    // const postDataQuery = `SELECT u.name, u.username,u.profile_img_url as profileImage, u.cover_img_url, t.id, t.user_id, t.content, t.is_drafted, t.is_posted, t.created_at FROM users as u INNER JOIN tweets as t ON u.id = t.user_id WHERE u.id=?`;



    // const [postData] = await connection.query(postDataQuery,[id]);
    // console.log(postData);


    let sql = `select users.id, users.name, users.username, users.profile_img_url, tweets.content, tweets.id as tweet_id, medias.media_url, tweet_likes.status as isLiked, bookmarks.status as isBookmarked
    from tweets join users on users.id = tweets.user_id 
    left join medias on medias.tweet_id = tweets.id
    left join tweet_likes on tweet_likes.tweet_id = tweets.id  and tweet_likes.user_id = '17'
    left join bookmarks on bookmarks.tweet_id = tweets.id  and bookmarks.user_id = '17'
    where tweets.user_id = ?`;

    let [result] = await connection.query(sql, [id]);
    

    return res.status(200).json({
      success: true,
      message: result
    });

  }catch(error){
    console.log(error);
  }
}