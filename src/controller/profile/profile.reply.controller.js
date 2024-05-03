const { log } = require('winston');
const connection = require('../../../config/connection');

exports.getReplies = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }

    const replyerDataQuery = `SELECT  tc.tweet_id as tweet_id FROM users as u LEFT JOIN tweet_comments as tc ON u.id = tc.user_id LEFT JOIN tweets as t ON t.user_id = u.id LEFT JOIN medias as m ON tc.tweet_id = m.tweet_id LEFT JOIN tweet_likes as tl ON tl.tweet_id = t.id LEFT JOIN bookmarks as b ON b.tweet_id = t.id WHERE u.id=? GROUP BY tc.tweet_id`;
    const [replyerData] = await connection.query(replyerDataQuery, [id]);
    let tweetId = [];
    for (let i = 0; i < replyerData.length; i++) {
      tweetId.push(replyerData[i].tweet_id);
    }
    console.log("This is replyerData", replyerData);

    const repliesPostDataQuery = `SELECT u.name as name, u.username as username, u.profile_img_url as profile_img_url, t.created_at as time, t.content as tweetContent,  m.media_url as media_url, t.id as tweet_id, b.status as isBookmarked, tl.status as isLiked, retweets.deleted_at as notRetweeted, retweets.created_at as createdAt, retweets.retweet_message as retweetMsg FROM users as u LEFT JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id LEFT JOIN bookmarks as b ON b.tweet_id = t.id LEFT JOIN tweet_likes as tl ON tl.tweet_id = t.id left join retweets on retweets.tweet_id=t.id and retweets.user_id = ? and retweets.deleted_at IS NULL WHERE t.id =? GROUP BY u.name , u.username, u.profile_img_url, t.created_at, t.content,  m.media_url, t.id, b.status , tl.status, retweets.deleted_at, retweets.created_at, retweets.retweet_message`;
    let repliesData = [];
    for (let i = 0; i < tweetId.length; i++) {
      let [[data]] = await connection.query(repliesPostDataQuery, [id, tweetId[i]]);
      repliesData.push(data);
    }

    let likeCountReplyerDataQuery = `SELECT tweet_id, COALESCE(sum(status), 0) as likeCount FROM tweet_likes group by tweet_id`;

    let [likeCountReplyerData] = await connection.query(likeCountReplyerDataQuery);

    repliesData.forEach((resultElement, index) => {
      likeCountReplyerData.forEach((likeCountElement, index) => {
        if (resultElement.tweet_id == likeCountElement.tweet_id) {
          if (resultElement.tweet_id == likeCountElement.tweet_id) {
            if (likeCountElement.likeCount == 0) {
              resultElement['likeCount'] = "";
            } else {
              resultElement['likeCount'] = likeCountElement.likeCount;
            }
          }
        }
      })
    });

    let tweetCountQuery = `SELECT tweet_id, count(tweet_id) as repostCount FROM retweets group by tweet_id`;

    let [tweetCountData] = await connection.query(tweetCountQuery);
    console.log("THis is tweet Count Data", tweetCountData);

    repliesData.forEach((resultElement, index) => {
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

    repliesData.forEach((resultElement, index) => {
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


    return res.status(200).json({
      success: true,
      message: repliesData
    });

  } catch (error) {
    console.log(error);
  }
};