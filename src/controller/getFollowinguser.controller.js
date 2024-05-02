const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getFollowingData = async (req, res) => {
  try {
    let id = req.query.id;
    let userId = req.user[0][0].id;
   
    const following = `select u.id, u.username as usernameoffollowing,u.name as user_name ,u.profile_img_url as image from followers f join users u on f.follower_id=
    u.id where f.following_id =? and f.current_status='1';`;
    const [followingData] = await connection.query(following,[id]);

 
        res.render("../views/pages/followingUser", {
          id: req.query.id,
          id,
          followingData,
          user: req.user[0][0]
        });
       }
  
  catch (error) {
    console.log(error);
  }
  }
