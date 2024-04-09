const conn=require('../../config/connection.js')
const LOGGER = require('../../logger/logger.js')


const SET_USER_NAME_PAGE = (req,res) =>{
  res.render("pages/setUserName");
}
// const getData = (sql,data)=>{
//   return new Promise((resolve,reject)=>{
//     conn.query(sql,data,(err,result)=>{
//       if(err){
//         reject(err);
//         LOGGER.error(err)
//       }
//       else{
//         resolve(result)
//       }
//     })
//   })
// }
const USER_NAME_EXIST = async (req,res) =>{
  let {username}=req.body;
  if(username.trim() == "" || (username.trim()).length < 3){
    res.status(422).json({'error':'Please enter Username more than 3 letters'})
  }
  else{
    let sql = "select count(*) as count from users where username = ?";
    let [findUser] = await conn.query(sql,username)

    LOGGER.info(findUser[0].count);
    if(findUser[0].count > 0){
      res.status(422).json({isValid:false})
    }else{
      res.status(200).json({isValid:true})
    }
  }
}

module.exports= {SET_USER_NAME_PAGE,USER_NAME_EXIST}
