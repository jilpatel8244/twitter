const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getExploreProfile = async (req, res) => {
  try {
    let id = req.query.id;
    let userId = req.user[0][0].id;
    logger.info(id);

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);

    if (userProfileData) {
      let isFollowing = false;
      let followerId = null;
      if (req.user) {
        const currentUserId = req.user.id;
        followerId = currentUserId;
        const followStatusQuery = `SELECT COUNT(*) AS isFollowing FROM followers WHERE follower_id = ? AND following_id = ?`;
        const [followStatusRows] = await connection.query(followStatusQuery, [
          currentUserId,
          id,
        ]);
        isFollowing = followStatusRows[0].isFollowing > 0;
      }

      const postDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [postData] = await connection.query(postDataQuery, [id]);
      console.log(postData[0]);

      if (postData[0]) {
        const profileTweetId = postData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);

        const following_detail = `select count(*) as following from followers where following_id=? and is_blocked =0 and current_status='1' `;
        const [following_detail_data] = await connection.query(
          following_detail,
          [id]
        );
        console.log(following_detail_data[0]);

        const follower_detail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [follower_detail_data] = await connection.query(follower_detail, [
          id,
        ]);
        console.log("Hello");
        console.log(follower_detail_data[0]);

        let profileData, replyData, tweetData, commentData;
        res.render("../views/pages/profile", {
          id: req.query.id,
          user: req.user[0][0],
          userId,
          id,
          userProfileData,
          following_detail_data,
          follower_detail_data,
          profileData,
          twitCountData,
          replyData,
          postData,
          tweetData,
          commentData,
          isFollowing,
          followerId,
        });
      } else {
        const following_detail = `select count(*) as following from followers where following_id=? and is_blocked =0 and current_status='1' `;
        const [following_detail_data] = await connection.query(
          following_detail,
          [id]
        );
        console.log(following_detail_data[0]);

        const follower_detail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [follower_detail_data] = await connection.query(follower_detail, [
          id,
        ]);
        console.log("Hello");
        console.log(follower_detail_data[0]);

        let profileData,
          replyData,
          tweetData,
          postData,
          commentData,
          twitCountData;
        res.render("../views/pages/profile", {
          id: req.query.id,
          user: req.user[0][0],
          userId,
          id,
          userProfileData,
          following_detail_data,
          follower_detail_data,
          profileData,
          twitCountData,
          replyData,
          postData,
          isFollowing,
          followerId,
          tweetData,
          commentData,
        });
      }
    } else {
      let profileData, twitCountData, replyData, tweetData, commentData;
      let following_detail_data = [];
      let follower_detail_data = [];
      res.render("../views/pages/profile", {
        id: req.query.id,
        user: req.user[0][0],
        userId,
        id,
        userProfileData,
        following_detail_data,
        follower_detail_data,
        profileData,
        twitCountData,
        replyData,
        tweetData,
        isFollowing: false,
        followerId: null,
        commentData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
