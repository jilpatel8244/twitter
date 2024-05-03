const connection = require('../../../config/connection');

exports.getProfileMedia = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }

    let sql = `select users.id, users.name, users.username, users.profile_img_url, tweets.content as tweetContent, tweets.id as tweet_id, medias.media_url, tweet_likes.status as isLiked, bookmarks.status as isBookmarked, tweets.created_at as time,  retweets.deleted_at as notRetweeted, retweets.created_at as createdAt, retweets.retweet_message as retweetMsg from tweets join users on users.id = tweets.user_id inner join medias on medias.tweet_id = tweets.id left join tweet_likes on tweet_likes.tweet_id = tweets.id and tweet_likes.user_id = ?
    left join bookmarks on bookmarks.tweet_id = tweets.id  and bookmarks.user_id = ?
    left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ? and retweets.deleted_at IS NULL
    where tweets.user_id = ? ORDER BY tweets.created_at DESC`;
    let [result] = await connection.query(sql, [id, id, id, id]);

    let likeCountQuery = `SELECT tweet_id, COALESCE(sum(status), 0) as likeCount FROM tweet_likes group by tweet_id`;

    let [likeCountData] = await connection.query(likeCountQuery);

    result.forEach((resultElement, index) => {
      likeCountData.forEach((likeCountElement, index) => {
        if (resultElement.tweet_id == likeCountElement.tweet_id) {
          if (likeCountElement.likeCount == 0) {
            resultElement['likeCount'] = "";
          } else {
            resultElement['likeCount'] = likeCountElement.likeCount;
          }
        }
      });
    });

    return res.json({ media: result });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went Wrong!" });
  }
};