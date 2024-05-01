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

    const repliesPostDataQuery = `SELECT u.name as name, u.username as username, u.profile_img_url as profile_img_url, t.created_at as time, t.content as content,  m.media_url as media_url, t.id as tweet_id, b.status as isBookmarked, tl.status as isLiked, retweets.deleted_at as notRetweeted, retweets.created_at as createdAt, retweets.retweet_message as retweetMsg FROM users as u LEFT JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id LEFT JOIN bookmarks as b ON b.tweet_id = t.id LEFT JOIN tweet_likes as tl ON tl.tweet_id = t.id left join retweets on retweets.tweet_id=t.id and retweets.user_id = ? and retweets.deleted_at IS NULL WHERE t.id =? GROUP BY u.name , u.username, u.profile_img_url, t.created_at, t.content,  m.media_url, t.id, b.status , tl.status, retweets.deleted_at, retweets.created_at, retweets.retweet_message`;
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

    return res.status(200).json({
      success: true,
      message: repliesData
    });

  } catch (error) {
    console.log(error);
  }
};