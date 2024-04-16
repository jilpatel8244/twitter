const connection = require('../../config/connection');
exports.getProfile = async (req,res)=>{
  try{

  const {id}=req.query;
  // console.log(id);

  const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
  const [twitCountData] = await connection.query(twitCount,[id]); 
  // console.log(twitCountData[0]);

  const profileDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE t.user_id = ?`;
  const [profileData] = await connection.query(profileDataQuery,[id]);
  // console.log(profileData);

  const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
  const [replyData] = await connection.query(replyDataQuery, [id]); 
  console.log(replyData);
  // let tweet = replyData[0].tweet_id;

  const tweetDataQuery = `SELECT * FROM tweets WHERE id=?`;
  const [tweetData] = await connection.query(tweetDataQuery,[id]);
  // console.log(tweetData);

    
  let getAllLikedData = `	select tweets.id as tweet_id, tweets.content, tweets.created_at, users.name, 
  users.username, bookmarks.status as isBookmarked, medias.media_url from tweet_likes 
  left join tweets on tweet_likes.tweet_id = tweets.id
  left join users on tweets.user_id = users.id
  left join bookmarks on tweet_likes.tweet_id = bookmarks.tweet_id   and 
tweet_likes.user_id = bookmarks.user_id 
  left join medias on tweet_likes.tweet_id = medias.tweet_id 
  where tweet_likes.user_id = ? and tweet_likes.status = '1';`
  
  let [allLikedTweet] = await connection.query(getAllLikedData, [id]);
 // console.log(allLikedTweet);
  
  allLikedTweet = allLikedTweet.map((element) => {
    element.isLiked = 1;
    return element;
  })
  
  if(profileData[0]){  
    console.log(allLikedTweet);
    res.render('../views/pages/profile',{profileData,twitCountData,replyData,allLikedTweet});
  }else{
    res.redirect("/home");
  }
}catch(e){
  console.log(e);
}
}
