const connection = require('../../config/connection');

exports.getFollower = async (req, res) => {
  try {
    console.log("jhfvhvhvhvhvhh");
    let isFollowing;
    isFollowing = false;
    let id = req.query.id;
    let userId = req.user[0][0].id;

    let [result] = await connection.query(`
            SELECT current_status
            FROM followers
            WHERE following_id = ? AND follower_id = ?
        `, [id, userId]);

    if (result[0] && result[0].current_status) isFollowing = true;
 
    let followerId = null;
    

    if (req.user) {
      
      const currentUserId = req.user.id;
      followerId = currentUserId;
      const followStatusQuery = `SELECT COUNT(*) AS isFollowing FROM followers WHERE follower_id = ? AND following_id = ?`;
      const [followStatusRows] = await connection.query(followStatusQuery, [
        currentUserId,
        id,
      ]);
      console.log("follow status", followStatusRows[0])
      // isFollowing = followStatusRows[0].isFollowing > 0;
      res.render("../views/pages/explore", {
        id: req.query.id,
        user: req.user[0][0],
        userId,
        id,
        isFollowing,
        followerId
      });
    }
  } catch (error) {
    console.log(error);
    // Handle error appropriately
    res.status(500).send("Internal Server Error");
  }
};
