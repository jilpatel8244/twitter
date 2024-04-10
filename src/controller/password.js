const md5 = require('md5');
const db = require('../../config/connection');

exports.getPassword = async (req,res)=>{
  const {email,activationCode} = req.query;

  let activationCodeQuery = `SELECT created_at FROM users WHERE email = ?`;
  let [activationInfo] = await db.query(activationCodeQuery,[email]);

  let difference = new Date().valueOf() - activationInfo[0].created_at.valueOf();
  let hours = Math.floor(difference / (1000 * 60 * 60));

  

  res.render('../views/pages/password',{email,activationCode});
}

exports.postPassword = async (req,res)=>{
  const {email, password} = req.body;

  let emailQuery = `SELECT * FROM users WHERE email = ? `;
  let [emailData] = await db.query(emailQuery,[email]);
  
  let dataId = emailData[0].id;
  let salt = emailData[0].salt;  

  let hashPassword = md5(password + salt);
  console.log(hashPassword);

  let passwordUpdateQuery = `UPDATE users SET password = ? WHERE id= ?`;
  await db.query(passwordUpdateQuery,[hashPassword,dataId]);

  res.json({isComplete: true});
}