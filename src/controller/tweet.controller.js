const logger = require("../../logger/logger");
const conn = require('../../config/connection.js')
const cookieParser = require("cookie-parser");


module.exports.tweetCreate = (req, res) => {
  res.render('partials/post.ejs')
}

module.exports.insertTweet = async (req, res) => {
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
      else {
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
    let sql = 'select * from tweets where is_drafted=1 and user_id= '+req.user[0][0].id;
    let result = await conn.execute(sql)
    return res.status(200).json({'draftTweet':result[0]})
  } catch (err) {
    return res.status(422).json({ 'error': "somethin went wrong" + err })
  }
}

exports.tweetUpdate = async (req,res) =>{
  let {tweetId,content,action,media}=req.body;
  let userId = req.user[0][0].id;
  console.log(media);
  if (media == [] && content.trim() == "") {
    return res.status(422).json({ 'error': "You didn't tweet content and Image(s)!" })
  }
  else {
    try {
      if (action == 'tweet') {
        let data = [ content || "", '0', '1',tweetId,userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql,data)
        if (media != undefined) {
          let { filename, mimetype } = media[0];
          await updateTweetImage([ filename, mimetype,tweetId], res)
        }
        return res.status(200).json({ 'msg': 'Updated' })
      }
      else {
        let data = [content || "", '1', '0',tweetId,userId];
        let sql = 'update tweets set content= ? ,is_drafted= ? , is_posted = ? where id = ? and user_id=?';
        await conn.query(sql,data)
        if (media != null) {
          let { filename, mimetype } = media[0];
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
    let sql=" update set medias media_url=?,media_type=? where tweet_id= ?";
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