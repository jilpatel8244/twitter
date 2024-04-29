const connection = require("../../config/connection");

exports.getExploreProfile = async (req, res) => {
  try {
    let isFollowing = false;
    let id = req.query.id;
    let userId = req.user[0][0].id;
    // logger.info(id);

    let [result] = await connection.query(`
            SELECT current_status
            FROM followers
            WHERE following_id = ? AND follower_id = ?
        `, [id, userId]);


    if (result[0] && result[0].current_status) isFollowing = true;

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);

    // console.log(userProfileData);

    if (userProfileData) {
      let followerId = null;
      if (req.user) {
        const currentUserId = req.user.id;
        followerId = currentUserId;
        const followStatusQuery = `SELECT COUNT(*) AS isFollowing FROM followers WHERE follower_id = ? AND following_id = ?`;
        const [followStatusRows] = await connection.query(followStatusQuery, [
          currentUserId,
          id,
        ]);
        console.log("followr", followStatusRows[0])
        // isFollowing = followStatusRows[0].isFollowing > 0;
      }

      const postDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [postData] = await connection.query(postDataQuery, [id]);
      console.log(postData[0]);

      if (postData[0]) {
        const profileTweetId = postData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);

        const followingDetail = `select count(*) as following from followers where following_id=? and is_blocked =0 and current_status='1' `;
        const [followingDetailData] = await connection.query(
          followingDetail,
          [id]
        );

        const followerDetail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [followerDetailData] = await connection.query(followerDetail, [
          id
        ]);

        let profileData, replyData, tweetData, commentData;
        res.render("../views/pages/profile", {
          id: req.query.id,
          user: req.user[0][0],
          userId,
          id,
          userProfileData,
          followingDetailData,
          followerDetailData,
          profileData,
          twitCountData,
          replyData,
          postData,
          isFollowing,
          tweetData,
          commentData,
          followerId,
        });
      } else {
        const followingDetail = `select count(*) as following from followers where following_id=? and is_blocked =0 and current_status='1' `;
        const [followingDetailData] = await connection.query(
          followingDetail,
          [id]
        );

        const followerDetail = `select count(*) as follower from followers where follower_id=? and is_blocked =0 and current_status='1'`;
        const [followerDetailData] = await connection.query(followerDetail, [
          id
        ]);

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
          followingDetailData,
          followerDetailData,
          profileData,
          twitCountData,
          replyData,
          isFollowing,
          postData,
          followerId,
          tweetData,
          commentData,
        });

      }
    } else {
      let profileData, twitCountData, replyData, tweetData, commentData;
      let followingDetailData = [];
      let followerDetailData = [];
      res.render("../views/pages/profile", {
        id: req.query.id,
        user: req.user[0][0],
        userId,
        id,
        userProfileData,
        followingDetailData,
        followerDetailData,
        profileData,
        twitCountData,
        isFollowing,
        replyData,
        tweetData,
        followerId: null,
        commentData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
