const connection = require('../../config/connection');
exports.getFollower = async (req, res) => {
  try {
     let userId =req.body

    const following_detail = `select count(*) from followers where following_id=2 and is_blocked =0 and current_status='1' and follower_id in(select following_id from 
      followers where follower_id =2 and is_blocked =0 and current_status='1')`;
    const [following_detail_data] = await connection.query(following_detail, [userId]);
    
    const follower_detail =`select count(*) from followers where follower_id=2 and is_blocked =0 and current_status='1' and following_id in(select following_id from 
      followers where follower_id =2 and is_blocked =0 and current_status='1') `;
      const [follower_detail_data] = await connection.query(follower_detail, [userId]);

  res.json({follower_detail_data,following_detail_data})
  } catch (error) {
    res.json({ error: error });
  }
};
