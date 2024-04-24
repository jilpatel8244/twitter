const connection = require('../../config/connection');

exports.getReplies = async (req, res) => {
  try {

    let id = req.user[0][0].id;

    const replyerDataQuery = `SELECT  u.name as replyerName,u.profile_img_url as replyerProfileImage, u.username as replyerUsername,tc.content as replyerMessage, tc.created_at as retweetDate, tc.tweet_id as tweetId, m.media_url as replyerMedia FROM users as u INNER JOIN tweet_comments as tc ON u.id = tc.user_id LEFT JOIN medias as m ON tc.tweet_id = m.tweet_id WHERE u.id=?`;
    const [replyerData] = await connection.query(replyerDataQuery, [id]);
    let tweetId = [];
    for (let i = 0; i < replyerData.length; i++) {
      tweetId.push(replyerData[i].tweetId);
    }
    

    const repliesPostDataQuery = `SELECT u.name, u.username, u.profile_img_url as profileImage, t.created_at, t.content,  m.media_url as media, t.id as id FROM users as u INNER JOIN tweets as t ON u.id = t.user_id LEFT JOIN medias as m ON t.id = m.tweet_id WHERE t.id =?`;
    let repliesPostData = [];
    for (let i = 0; i < tweetId.length; i++) {
      let [[data]] = await connection.query(repliesPostDataQuery, [tweetId[i]]);
      repliesPostData.push(data);
    }
    

    let repliesData = [repliesPostData, replyerData];
    console.log("\n\n\n\n\n\n\n\n replies data",repliesData);
    return res.json({ repliesData });

  } catch (error) {
    console.log(error);
  }
}