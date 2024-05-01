const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getFollowingData = async (req, res) => {
  try {
    let id = req.query.id;
   
    const following = `select u.username as usernameoffollowing,u.name as user_name from followers f join users u on f.follower_id=
    u.id where f.following_id =?`;
    const [followingData] = await connection.query(following,[id]);
    console.log("following here",followingData) 
    res.json({followingData})

    
        res.render("../views/pages/following", {
          id: req.query.id,
          id,
          followingData
        });
       }
      
    
  catch (error) {
    console.log(error);
  }
  }
