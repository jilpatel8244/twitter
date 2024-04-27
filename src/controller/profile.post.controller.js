const connection = require('../../config/connection');

exports.getPosts = async (req, res) => {
  try {

    let id = req.query.id;
    console.log("id for the user should be here",req.query.id);
    console.log("id for the post before the confition in like section" ,id);
    if(!id){

     id = req.user[0][0].id;
    }
    console.log("id for the post after the confition in like section" ,id);

    let postDataQuery = `select users.id, users.name, users.username, users.profile_img_url, tweets.content, tweets.id as tweet_id, medias.media_url, tweet_likes.status as isLiked, bookmarks.status as isBookmarked, tweets.created_at as time
    from tweets join users on users.id = tweets.user_id 
    left join medias on medias.tweet_id = tweets.id
    left join tweet_likes on tweet_likes.tweet_id = tweets.id  and tweet_likes.user_id = '?'
    left join bookmarks on bookmarks.tweet_id = tweets.id  and bookmarks.user_id = '?'
    where tweets.user_id = ? ORDER BY tweets.created_at DESC`;

    let [result] = await connection.query(postDataQuery, [id, id, id]);

    let likeCountQuery = `SELECT tweet_id, COALESCE(sum(status), 0) as likeCount FROM tweet_likes group by tweet_id`;

    let [likeCountData] = await connection.query(likeCountQuery, [id]);
    
    result.forEach((resultElement, index) => {
      likeCountData.forEach((likeCountElement, index) => {
        if (resultElement.tweet_id == likeCountElement.tweet_id) {
          resultElement['likeCount'] = likeCountElement.likeCount;
        }
      })
    });    

    return res.status(200).json({
      success: true,
      message: result
    });

  } catch (error) {
    console.log(error);
  }
}