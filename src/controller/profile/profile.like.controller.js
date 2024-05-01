const { log } = require('winston');
const connection = require('../../../config/connection');

exports.getLikes = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }

    let likesDataQuery = `select tweets.id as tweet_id, tweets.content, tweets.created_at as time, users.name, 
    users.username, users.profile_img_url, bookmarks.status as isBookmarked, medias.media_url, retweets.deleted_at as notRetweeted, retweets.created_at as createdAt, retweets.retweet_message as retweetMsg from tweet_likes 
    left join tweets on tweet_likes.tweet_id = tweets.id left join users on tweets.user_id = users.id left join bookmarks on tweet_likes.tweet_id = bookmarks.tweet_id and tweet_likes.user_id = bookmarks.user_id left join medias on tweet_likes.tweet_id = medias.tweet_id left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ? and retweets.deleted_at IS NULL where tweet_likes.user_id = ? and tweet_likes.status = '1';`
    let [likesData] = await connection.query(likesDataQuery, [id, id]);

    let likeCountQuery = `SELECT tweet_id, COALESCE(sum(status), 0) as likeCount FROM tweet_likes group by tweet_id`;

    let [likeCountData] = await connection.query(likeCountQuery);

    likesData.forEach((resultElement, index) => {
      likeCountData.forEach((likeCountElement, index) => {
        if ((resultElement.tweet_id == likeCountElement.tweet_id)) {
          resultElement['likeCount'] = likeCountElement.likeCount;
        }
      })
    });

    likedElement = likesData.map((element) => {
      element.isLiked = 1;
      return element;
    });

    return res.status(200).json({
      success: true,
      message: likedElement
    });

  } catch (error) {
    console.log(error);
  }
};