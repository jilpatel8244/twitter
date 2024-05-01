const md5 = require('md5');
const connection = require('../../config/connection');

exports.getPassword = async (req, res) => {

  try {
    const { email, activecode } = req.query;


    let activationCodeQuery = `SELECT created_at FROM users WHERE email = ?`;
    let [activationInfo] = await connection.query(activationCodeQuery, [email]);

    if (activationInfo[0]) {
      let difference = new Date().valueOf() - activationInfo[0].created_at.valueOf();
      let hours = Math.floor(difference / (1000 * 60 * 60));
      res.render('../views/pages/password', { email, activecode, hours });
    }
  } catch (error) {

  }
}

exports.setPassword = async (req, res) => {

  try {
    const { email, password } = req.body;


    let emailQuery = `SELECT * FROM users WHERE email = ? `;
    let [emailData] = await connection.query(emailQuery, [email]);
    let dataId = emailData[0].id;
    let salt = emailData[0].salt;
    let hashPassword = md5(password + salt);

    let passwordUpdateQuery = `UPDATE users SET password = ? ,is_active=1 WHERE id= ?`;
    await connection.query(passwordUpdateQuery, [hashPassword, dataId]);
    res.redirect('/login');

  } catch (error) {
    res.json({ error: error })
  }

}