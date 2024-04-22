const connection = require('../../config/connection');
const logger = require('../../logger/logger');

exports.getProfile = async (req, res) => {
  try {
    let id = req.user[0][0].id;
    // const { id } = req.query;
    // console.log(id);
    logger.info(id);

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);
    // console.log(userProfileData);

    if (userProfileData) {

      const postDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [postData] = await connection.query(postDataQuery, [id]);
      console.log(postData[0]);

      if (postData[0]) {

        const profileTweetId = postData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);
        // console.log(twitCountData[0]);
        let profileData, replyData, tweetData, commentData;
        let allLikedTweet=[];
        res.render("../views/pages/profile", { user: req.user[0][0],userProfileData,postData, profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
      
        } else {
          let replyData, tweetData, commentData, postData;
          let allLikedTweet =[];
          res.render('../views/pages/profile', { user: req.user[0][0],userProfileData, profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData, postData });
        }
      }
      
    }
  catch (error) {
    console.log(error);
  }
}






