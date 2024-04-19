const logger = require("../../logger/logger");
const conn = require('../../config/connection.js')
const cookieParser = require("cookie-parser");


module.exports.tweetCreate = (req, res) => {
  res.render('partials/post.ejs')
}

module.exports.insertTweet = async (req, res) => {
  if(req.fileValidationError != undefined){
    return res.status(422).json({ 'error':req.fileValidationError});
  }
  let { content } = req.body;
  let { status } = req.query;
  let userId = req.user[0][0].id;
  if (req.files == [] && content.trim() == "") {
    return res.status(422).json({ 'error': "You didn't tweet content and Image(s)!" })
  }
  else {
    try {
      if (status == 'tweet') {
        let data = [userId, content || "", '0', '1'];
        lastInsertedId = await insertContent(data, res)
        if (req.files[0] != null) {
          let { filename, mimetype } = req.files[0];
          await insertTweetImage([lastInsertedId, filename, mimetype], res)
        }
        return res.status(200).json({ 'msg': 'Inserted' })
      }
      if(status == 'draft'){
        let data = [userId, content || "", '1', '0'];
        lastInsertedId = await insertContent(data)
        if (req.files[0] != null) {
          let { filename, mimetype } = req.files[0];
          await insertTweetImage([lastInsertedId, filename, mimetype], res)
        }
        return res.status(200).json({ 'msg': 'Drafted' })
      }
    }
    catch (err) {
      console.log(err)
      return res.status(422).json({ 'error': "somethin went wrong" + err })
    }
  }
}

const insertContent = async (data, res) => {
  try {
    let sqlConent = 'insert into tweets(user_id,content,is_drafted,is_posted) values (?,?,?,?);';
    let [result] = await conn.query(sqlConent, data)
    return result.insertId;
  }
  catch (err) {
    console.log(err)
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }

}

const insertTweetImage = async (data, res) => {
  try {
    let imageSql = 'insert into medias (tweet_id,media_url,media_type) values (?,?,?);';
    await conn.query(imageSql, data);
  }
  catch (err) {
    console.log(err)
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }
}

exports.showDrafts = async (req, res) => {
  try {
    let sql = 'select * from tweets where deleted_at IS NULL and is_drafted=1 and user_id= '+req.user[0][0].id;
    let result = await conn.execute(sql)
    return res.status(200).json({'draftTweet':result[0]})
  } catch (err) {
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }
}

exports.tweetUpdate = async (req,res) =>{
  if(req.fileValidationError != undefined){
    return res.status(422).json({ 'error':req.fileValidationError});
  }
  let {tweetId,content,action}=req.body;
  let userId = req.user[0][0].id;
  if (req.file == [] && content.trim() == "") {
    return res.status(422).json({ 'error': "You didn't tweet content and Image(s)!" })
  }
  else {
    try {
      if (action == 'tweet') {
        let data = [ content || "", '0', '1',tweetId,userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql,data);
        if (req.file != undefined) {
          let { filename, mimetype } = req.file;
          await updateTweetImage([ filename, mimetype,tweetId], res)
        }
        return res.status(200).json({ 'msg': 'Updated' })
      }
      else if(action == 'draft'){
        let data = [content || "", '1', '0',tweetId,userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql,data)
        if (req.file != null) {
          let { filename, mimetype } = req.file;
          await updateTweetImage([ filename, mimetype,tweetId], res)
        }
        return res.status(200).json({ 'msg': 'Re-Drafted' })
      }
    }
    catch (err) {
      console.log(err)
      return res.status(422).json({ 'error': "something went wrong" + err })
    }
  }
}

const updateTweetImage=async(data,res)=>{
  try{
    let sql="select count(*) as isTweetExist from medias where tweet_id = ?"
    let [isTweetExist] = await conn.query(sql,data[2]);
    console.log(isTweetExist);
    if(isTweetExist[0].isTweetExist == 0){
      return await insertTweetImage([data[2],data[0],data[1]],res)
    }
  }catch(error){
    return res.status(422).json({'error': "tweet image error"+err})
  }
  try{
    let sql="update medias set media_url = ? , media_type = ? where tweet_id= ?";
    await conn.query(sql,data);
  }
  catch(err){
    return res.status(422).json({'error': "Draft error-"+err})
  }
}
exports.displayImage = async(req,res)=>{
  let {id}=req.query;
  try{
    let sql="select * from medias where tweet_id=?";
    let result=await conn.query(sql,id);
    return res.status(200).json({'image':result[0][0]})
  }
  catch(err){
    return res.status(422).json({'error': "Image-"+err})
  }
}

exports.deleteDraft = async (req,res)=>{
  let {deleteDraft}=req.body;
  if(!deleteDraft.length){
    console.log(deleteDraft);
    return res.status(422).json({'error': "nothing sending..."})
  }
  let sql1 = "update tweets set deleted_at= current_timestamp() where id in ("+deleteDraft+")";
  let sql2 = "update medias set deleted_at= current_timestamp() where case when tweet_id in ("+deleteDraft+") then  tweet_id in ("+deleteDraft+")  end";
  try{
    await conn.query(sql2)
    await conn.query(sql1,deleteDraft)
    res.status(200).json({msg:'Deleted'})
  }
  catch(err){
    return res.status(422).json({'error': "delete-"+err})
  }
}