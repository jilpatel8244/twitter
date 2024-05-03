const connection = require('../../../config/connection');

exports.getPosts = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }

    let postDataQuery = `SELECT users.username, users.id AS user_id, users.name, users.profile_img_url as profile_img_url, tweets.id as tweet_id, tweets.content as tweetContent, tweets.created_at, tweets.retweet_id as retweetId, tweets.user_id = ? as isAuthor, tweet_comments.content as comments, medias.media_url as media_url, bookmarks.status as isBookmarked, tweet_likes.status as isLiked, tweets.created_at as time ,retweets.tweet_id as rt_id FROM users LEFT JOIN tweets ON users.id = tweets.user_id LEFT JOIN retweets ON retweets.id = tweets.retweet_id AND retweets.deleted_at IS NULL LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id LEFT JOIN medias ON tweets.id = medias.tweet_id LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id AND bookmarks.user_id = ? LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id AND tweet_likes.user_id = ? WHERE users.is_active = 1 AND tweets.is_posted = 1 AND tweets.deleted_at IS NULL AND users.id= ? ORDER BY tweets.created_at DESC`;

    let [result] = await connection.query(postDataQuery, [id, id, id, id]);

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

    let tweetCountQuery = `SELECT tweet_id, count(tweet_id) as repostCount FROM retweets group by tweet_id`;

    let [tweetCountData] = await connection.query(tweetCountQuery);
    console.log("THis is tweet Count Data", tweetCountData);

    result.forEach((resultElement, index) => {
      tweetCountData.forEach((likeCountElement, index) => {
        if (resultElement.tweet_id == likeCountElement.tweet_id) {
          if (likeCountElement.repostCount == 0) {
            resultElement['repostCount'] = "";
          } else {
            resultElement['repostCount'] = likeCountElement.repostCount;
          }
        }
      });
    });

    let tweetDataQuery = `SELECT t.content AS original_tweet_content, t.deleted_at as notRetweeted,t.retweet_id as tweet_id, t.id AS original_tweet_id, u.id as original_user_id, u.username AS original_poster_username, u.name AS original_poster_name, u.profile_img_url as original_poster_profile_img_url, medias.media_url as original_media_url, t.created_at as tweetTime FROM users AS u LEFT JOIN tweets AS t ON t.user_id = u.id LEFT JOIN medias ON t.id = medias.tweet_id`;

    let [tweetData] = await connection.query(tweetDataQuery);
    console.log(tweetData);

    result.forEach((resultElement, index) => {
      tweetData.forEach((likeCountElement, index) => {
        if (resultElement.rt_id == likeCountElement.original_tweet_id) {
          resultElement['original_tweet_content'] = likeCountElement.original_tweet_content;
          resultElement['notRetweeted'] = likeCountElement.notRetweeted;
          resultElement['original_tweet_id'] = likeCountElement.original_tweet_id;
          resultElement['original_user_id'] = likeCountElement.original_user_id;
          resultElement['original_poster_username'] = likeCountElement.original_poster_username;
          resultElement['original_poster_name'] = likeCountElement.original_poster_name;
          resultElement['original_poster_profile_img_url'] = likeCountElement.original_poster_profile_img_url;
          resultElement['original_media_url'] = likeCountElement.original_media_url;
          resultElement['tweetTime'] = likeCountElement.tweetTime;
        }
      });
    });

    console.log(result);

    return res.status(200).json({
      success: true,
      message: result
    });

  } catch (error) {
    console.log(error);
  }
};