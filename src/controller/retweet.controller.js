const conn = require('../../config/connection');

module.exports.retweet = async (req, res) => {
  let { tweetId, action,retweetMsg } = req.body;
  let userId = req.user[0][0].id;
  if (!tweetId) {
    return res.status(422).json({ 'error': 'Please send tweetId!' });
  }
  try {
    let sql = `select * from medias join tweets on tweets.id = medias.tweet_id where tweets.deleted_at IS NULL and tweets.is_ristricted=0 and tweets.id= ?`;
    let [result] = await conn.query(sql, [tweetId]);
    if (action == "repost") {
      try {
        let repostQuery = "insert into retweets(tweet_id,user_id) values (?,?)";
        await conn.query(repostQuery, [tweetId,userId]);
        let notification = await insertNotification([result[0].user_id, tweetId, 'Retweet', userId]);
        return res.status(200).json({'msg':"reposted"})
      } catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': "Something went wrong" + error })
      }
    }
    else if(action == "undo"){
      try{
        let undoPostQuery="update retweets set retweets.deleted_at=current_timestamp() where tweet_id=? and user_id= ?";
        await conn.query(undoPostQuery,[tweetId,userId]);
        return res.status(200).json({'msg':"Undo repost"})
      }catch (error) {
        console.log(error);
        return res.status(500).json({ 'error': "Something went wrong in undo repost" + error })
      }
    }
    else if (action == "quote") {
        try {
          let repostQuery = "insert into retweets(tweet_id,user_id,retweet_message) values (?,?,?)";
          let [quoteInserted]= await conn.query(repostQuery, [tweetId,userId,retweetMsg || null]);
          await insertNotification([result[0].user_id, tweetId, 'Retweet', userId]);
          return res.status(200).json({'msg':"Quoted repost",'retweetId':quoteInserted.insertId})
        } catch (error) {
          console.log(error);
          return res.status(500).json({ 'error': "Something went wrong" + error })
        }
    }
  }catch (error) {
    console.log(error);
    return res.status(500).json({ 'error': "Something went wrong" + error })
  }
}

const insertNotification = async (data) => {
  try {
    let sql = 'insert into notifications (user_id,tweet_id,type,related_user_id) values (?,?,?,?);';
    await conn.query(sql, data);
    return { 'msg': 'Add notification' };
  }
  catch (err) {
    return { "error": err }
  }
}
module.exports.retweetData = async(req,res)=>{
  let {tweetId}= req.body;
  let userId=req.user[0][0].id;
  try{
    let sql="select count(*) as isRetweeted from retweets where user_id= ? and tweet_id= ? and deleted_at is null and retweet_message is null";
    let [result]=await conn.query(sql,[userId,tweetId]);
    return res.status(200).json({isRetweeted:result[0].isRetweeted});
  }catch(error){
    return res.status(500).json({ 'error': "Something went wrong" + error })
  }   
}