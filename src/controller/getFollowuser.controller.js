const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getFollowData = async (req, res) => {
  try {
    let id = req.query.id;
 
    const follower = `select u.username as usernameoffollowing,u.name as user_name from followers f join users u on f.following_id=
    u.id where f.follower_id =?`;
    const [followerData] = await connection.query(follower,[id]);
    console.log("follower here",followerData)  
    //res.json({followerData})
    
        res.render("../views/pages/follower", {
          id: req.query.id, id, followerData
        });
      }
  catch (error) {
    console.log(error);
  }
  }
