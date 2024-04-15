const md5 = require('md5');
const db = require('../../config/connection');

exports.getPassword = async (req, res) => {
  const { email, activecode } = req.query;
  console.log(activecode);

  let activationCodeQuery = `SELECT created_at FROM users WHERE email = ?`;
  let [activationInfo] = await db.query(activationCodeQuery, [email]);

  if (activationInfo[0]) {
    let difference = new Date().valueOf() - activationInfo[0].created_at.valueOf();
    let hours = Math.floor(difference / (1000 * 60 * 60));
    res.render('../views/pages/password', { email, activecode, hours });

  }





}

exports.setPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);


  try {

    let emailQuery = `SELECT * FROM users WHERE email = ? `;
    let [emailData] = await db.query(emailQuery, [email]);
    let dataId = emailData[0].id;
    let salt = emailData[0].salt;
    let hashPassword = md5(password + salt);
    console.log(hashPassword);
    let passwordUpdateQuery = `UPDATE users SET password = ? ,is_active=1 WHERE id= ?`;
    await db.query(passwordUpdateQuery, [hashPassword, dataId]);
    res.json({ isComplete: true });

  } catch (error) {
    res.json({ error: error })
  }

}