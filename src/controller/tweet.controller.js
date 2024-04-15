const logger = require("../../logger/logger");
const conn=require('../../config/connection.js')
const {upload}=require('../middleware/multer')


module.exports.tweetCreate = (req,res)=>{
  res.render('partials/post.ejs')
}

module.exports.insertTweet=async(req,res)=>{
    let {content}=req.body;
    let {status}= req.query;
    if(content.trim() == ""){
      return res.status(422).json({'error':"You didn't tweet content!"})
    }
    else{
      let sql='insert into tweets(user_id,content,is_drafted,is_posted) values (?,?,?,?);';
      try{
        if(status == 'tweet'){
          await conn.execute(sql,['1',content,'0','1']);
          return res.status(200).json({'msg':'Inserted'})
        } 
        else {
          await conn.execute(sql,['1',content,'1','0']);
          return res.status(200).json({'msg':'Drafted'})

        }
      }
      catch(err){
        return res.status(422).json({'error':"somethin went wrong"+err})
      }
    }
}
