const connection = require('../../config/connection');

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);

    const profileDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
    const [profileData] = await connection.query(profileDataQuery, [id]);
    console.log(profileData[0]);

    if (profileData[0]) {

      const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
      const [twitCountData] = await connection.query(twitCount, [id]);
      console.log(twitCountData[0]);

      const commentDataQuery = `SELECT *,tc.created_at as comment_created FROM tweet_comments as tc INNER JOIN users as u ON tc.user_id = u.id WHERE tweet_id= ?`;
      const [commentData] = await connection.query(commentDataQuery, [profileData[0].id]);
      console.log(commentData);

      const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
      let [replyData] = await connection.query(replyDataQuery, [id]) || [[]];

      if (replyData[0]) {
        console.log(replyData);
        let tweetId = replyData[0].tweet_id;
        console.log(tweetId);
        const tweetDataQuery = `SELECT u.name,u.username,t.id,t.content,t.created_at as tweet_Date FROM tweets as t INNER JOIN users as u ON u.id = t.user_id WHERE t.id=?`;
        let [tweetData] = await connection.query(tweetDataQuery, [tweetId]);
        console.log(tweetData);
        if (commentData[0]) {
          res.render('../views/pages/profile', { profileData, twitCountData, replyData, tweetData, commentData });
        } else {
          let commentData;
          res.render('../views/pages/profile', { profileData, twitCountData, replyData, tweetData, commentData });
        }
      } else {
        let replyData, tweetData, commentData;
        res.render('../views/pages/profile', { profileData, twitCountData, replyData, tweetData, commentData });
      }


    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
}