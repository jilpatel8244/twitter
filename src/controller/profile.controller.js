const connection = require('../../config/connection');
const logger = require('../../logger/logger');

exports.getProfile = async (req, res) => {
  try {
    let id = req.user[0][0].id;
    // const { id } = req.query;
    console.log(id);
    logger.info(id);

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);
    console.log(userProfileData);

    if (userProfileData) {

      const profileDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [profileData] = await connection.query(profileDataQuery, [id]);
      console.log(profileData[0]);

      if (profileData[0]) {

        const profileTweetId = profileData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);
        console.log(twitCountData[0]);

        const commentDataQuery = `SELECT *,tc.created_at as comment_created FROM tweet_comments as tc INNER JOIN users as u ON tc.user_id = u.id WHERE tweet_id= 30`;
        const [commentData] = await connection.query(commentDataQuery, [profileTweetId]);
        console.log(profileTweetId);
        console.log(commentData);

        if (commentData) {

          const replyCommentDataQuery = `SELECT * FROM reply_comments WHERE id=`;

        }

        const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
        let [replyData] = await connection.query(replyDataQuery, [id]) || [[]];

        if (replyData[0]) {
          console.log(replyData);
          let tweetId = replyData[0].tweet_id;
          // console.log(tweetId);
          logger.info(tweetId);
          const tweetDataQuery = `SELECT u.name,u.username,t.id,t.content,t.created_at as tweet_Date FROM tweets as t INNER JOIN users as u ON u.id = t.user_id WHERE t.id=?`;
          let [tweetData] = await connection.query(tweetDataQuery, [tweetId]);
          console.log(tweetData);
          if (commentData[0]) {
            let allLikedTweet = [];
            res.render('../views/pages/profile', { allLikedTweet, profileData, twitCountData, replyData, tweetData, commentData });
          } else {
            let commentData;
            let allLikedTweet = [];
            res.render('../views/pages/profile', { allLikedTweet, profileData, twitCountData, replyData, tweetData, commentData });
          }
        } else {
          let replyData, tweetData, commentData;
          let allLikedTweet = [];
          res.render('../views/pages/profile', { profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
        }
      }else{
        let profileData,twitCountData,replyData,tweetData,commentData;
        let allLikedTweet=[];
        res.render("../views/pages/profile",  {userProfileData, profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
      }

    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
}