const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getFollowData = async (req, res) => {
  try {
    let id = req.query.id;
    let userId = req.user[0][0].id;

    const follower = `select u.id, u.username as usernameoffollowing,u.name as user_name ,u.profile_img_url as image from followers f join users u on f.following_id=
    u.id where f.follower_id =? and f.current_status='1'`;
    const [followerData] = await connection.query(follower,[id]);
    console.log("follower here",followerData)  
    //res.json({followerData})
    
        res.render("../views/pages/followUser", {
          id: req.query.id, id, followerData, user: req.user[0][0]
        });
      }
  catch (error) {
    console.log(error);
  }
  }
