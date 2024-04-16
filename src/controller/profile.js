const db = require('../../config/connection');
exports.getProfile = async (req,res)=>{
  try{
  const {id}=req.query;
  console.log(id);

  const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
  const [twitCountData] = await db.query(twitCount,[id]); 
  console.log(twitCountData[0]);

  const profileDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE t.user_id = ?`;
  const [profileData] = await db.query(profileDataQuery,[id]);
  console.log(profileData);

  const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
  const [replyData] = await db.query(replyDataQuery, [id]); 
  console.log(replyData);

  const tweetDataQuery = `SELECT * FROM tweets WHERE id=replyData[0].tweet_id`;
  const [tweetData] = await db.query(tweetDataQuery);
  console.log(tweetData);

  if(profileData[0]){  
    res.render('../views/pages/profile',{profileData,twitCountData,replyData});
  }else{
    res.redirect("/home");
  }
}catch(e){
  console.log(e);
}
}
