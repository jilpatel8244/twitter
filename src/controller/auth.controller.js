<<<<<<< HEAD
const conn=require('../../config/connection.js')
const LOGGER = require('../../logger/logger.js')

const USER_NAME_EXIST = async (req,res) =>{
  let {username}=req.body;
  if(username.trim() == "" || (username.trim()).length < 3){
    return res.status(422).json({'error':'Please enter Username more than 3 letters'})
  }
  else{
    let sql = "select count(*) as count from users where username = ?";
    let [findUser] = await conn.query(sql,username)

    LOGGER.info(findUser[0].count);
    if(findUser[0].count > 0){
      return res.status(422).json({isValid:false})
    }else{
      return res.status(200).json({isValid:true})
    }
}
module.exports= {USER_NAME_EXIST}

const logger = require("../../logger/logger");
const connection = require("../../config/connection");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const md5 = require("md5");
=======
const logger = require("../../logger/logger");
const connection = require("../../config/connection");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const md5 = require("md5");
// const conn = require("../../config/connection.js");
// const LOGGER = require("../../logger/logger.js");

// const SET_USER_NAME_PAGE = (req, res) => {
//   res.render("pages/setUserName");
// };
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
// const USER_NAME_EXIST = async (req, res) => {
//   let { username } = req.body;
//   if (username.trim() == "" || username.trim().length < 3) {
//     res
//       .status(422)
//       .json({ error: "Please enter Username more than 3 letters" });
//   } else {
//     let sql = "select count(*) as count from users where username = ?";
//     let [findUser] = await conn.query(sql, username);

//     LOGGER.info(findUser[0].count);
//     if (findUser[0].count > 0) {
//       res.status(422).json({ isValid: false });
//     } else {
//       res.status(200).json({ isValid: true });
//     }
//   }
// };

// module.exports = { SET_USER_NAME_PAGE, USER_NAME_EXIST };
>>>>>>> 9658252e20e6a69f093e67c38c61ead90c2f077e



exports.loginHandler = async (req, res) => {
  let { email, password } = req.body;

  try {
    let [userExist] = await connection.query(
      "select * from users where email = ?",
      [email]
    );
    if (!userExist.length) {
      return res.status(401).json({
        success: false,
        message: "user not exists",
      });
    }

    if (!userExist[0].is_active) {
      return res.status(401).json({
        success: false,
        message: "user not activated",
      });
<<<<<<< HEAD
    }

    console.log(md5(password));
    console.log(userExist[0].password);

    if (userExist[0].password !== md5(password)) {
      return res.status(401).json({
        success: false,
        message: "password not match",
      });
    }

=======
    }

    console.log(md5(password));
    console.log(userExist[0].password);

    if (userExist[0].password !== md5(password)) {
      return res.status(401).json({
        success: false,
        message: "password not match",
      });
    }

>>>>>>> 9658252e20e6a69f093e67c38c61ead90c2f077e
    let payload = {
      id: userExist[0].id,
      email: userExist[0].email,
      userName: userExist[0].user_name,
      roleId: userExist[0].role_id,
    };

    const TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let options = {
      httpOnly: true,
      SameSite: "None",
    };

    return res.status(200).cookie("token", TOKEN, options).json({
      success: true,
      message: "everything is okay",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotpassword = (req, res) => {
  res.render("pages/forgot_password");
};

exports.login = (req, res) => {
  res.render("pages/login");
};
