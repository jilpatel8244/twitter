const connection = require('../../config/connection');

exports.getLikes = async (req, res) => {
  try {
    let id = req.user[0][0].id;
    console.log(id);

    let likesDataQuery = `	select tweets.id as tweet_id, tweets.content, tweets.created_at, users.name, 
    users.username, users.profile_img_url as profileImage, bookmarks.status as isBookmarked, medias.media_url as media from tweet_likes 
    left join tweets on tweet_likes.tweet_id = tweets.id
    left join users on tweets.user_id = users.id
    left join bookmarks on tweet_likes.tweet_id = bookmarks.tweet_id   and 
  tweet_likes.user_id = bookmarks.user_id 
    left join medias on tweet_likes.tweet_id = medias.tweet_id 
    where tweet_likes.user_id = ? and tweet_likes.status = '1';`
    let [likesData] = await connection.query(likesDataQuery, [id]);

    likedElement = likesData.map((element) => {
      element.isLiked = 1;
      return element;
    });
 
    console.log("\nHello this is what it is: ",likedElement);
    return res.json(likedElement);

  } catch (error) {
    console.log(error);
  }
}