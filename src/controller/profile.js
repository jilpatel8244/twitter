const db = require('../../config/connection');
exports.getProfile = async (req,res)=>{
  
  const {id}=req.query;
  console.log(id);

  const twitCount = `SELECT count(*) as t FROM twitsdtls_tbl WHERE twit_user_id = ?`;
  const [twitCountData] = await db.query(twitCount,[id]); 
  console.log(twitCountData[0]);

  const profileDataQuery = `SELECT * FROM users as u INNER JOIN twitsdtls_tbl as t ON u.id=t.twit_user_id WHERE t.twit_user_id = ?`;
  const [profileData] = await db.query(profileDataQuery,[id]);
  console.log(profileData);

  if(profileData[0]){  
    res.render('../views/pages/profile',{profileData,twitCountData});
  }else{
    res.redirect("/home");
  }
}
