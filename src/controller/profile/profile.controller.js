const connection = require("../../../config/connection");

exports.getProfile = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      id = req.user[0][0].id;
    }

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);

    if (userProfileData) {

      const postDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [postData] = await connection.query(postDataQuery, [id]);

      if (postData[0]) {
        const profileTweetId = postData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);

        const followingDetail = `select count(*) as following from followers where following_id=? and is_blocked=0 and current_status='1' `;
        const [followingDetailData] = await connection.query(followingDetail, [id]);

        const followerDetail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [followerDetailData] = await connection.query(followerDetail, [id]);

        let profileData, replyData, tweetData, commentData;
        res.render("../views/pages/profile", { id: req.query.id, user: req.user[0][0], id, userProfileData, followingDetailData, followerDetailData, profileData, twitCountData, replyData, postData, tweetData, commentData });

      } else {
        const followingDetail = `select count(*) as following from followers where following_id=? and is_blocked =0 and current_status='1' `;
        const [followingDetailData] = await connection.query(followingDetail, [id]);

        const followerDetail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [followerDetailData] = await connection.query(followerDetail, [id]);

        let profileData, replyData, tweetData, postData, commentData, twitCountData;
        res.render("../views/pages/profile", { id: req.query.id, user: req.user[0][0], id, userProfileData, followingDetailData, followerDetailData, profileData, twitCountData, replyData, postData, tweetData, commentData });

      }
    } else {
      let profileData, twitCountData, replyData, tweetData, commentData;
      let followingDetailData = [];
      let followerDetailData = [];
      res.render("../views/pages/profile", { id: req.query.id, user: req.user[0][0], id, userProfileData, followingDetailData, followerDetailData, profileData, twitCountData, replyData, tweetData, commentData });
    }
  } catch (error) {
    console.log(error);
  }
};
