const connection = require('../../config/connection');

exports.getReplies = async (req, res) => {
  try {

    let id = req.user[0][0].id;

    const retweeterDataQuery = `SELECT  u.name as retweeterName,u.profile_img_url as retweeterProfileImage, u.username as retweeterUsername,rt.retweet_message as retweeterMessage, rt.created_at as retweetDate, rt.tweet_id as tweetId FROM users as u INNER JOIN retweets as rt ON u.id = rt.user_id WHERE u.id=?`;
    const [retweeterData] = await connection.query(retweeterDataQuery, [id]);
    let tweetId = [];
    for (let i = 0; i < retweeterData.length; i++) {
      tweetId.push(retweeterData[i].tweetId);
    }
    

    const repliesPostDataQuery = `SELECT u.name, u.username, u.profile_img_url as profileImage, t.created_at, t.content FROM users as u INNER JOIN tweets as t ON u.id = t.user_id WHERE t.id =?`;
    let repliesPostData = [];
    for (let i = 0; i < tweetId.length; i++) {
      let [[data]] = await connection.query(repliesPostDataQuery, [tweetId[i]]);
      repliesPostData.push(data);
    }
    

    let repliesData = [repliesPostData, retweeterData];
    return res.json({ repliesData });

  } catch (error) {
    console.log(error);
  }
}