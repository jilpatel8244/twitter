const connection = require("../../config/connection");
let md5 = require("md5");
const logger = require("../../logger/logger");

exports.resetpasswordget = async (req, res) => {
  res.render("pages/resetpasswordProfile");
};

exports.reset_password = async (req, res) => {
  if (!req.body.inputOldpassword && !req.body.inputNewpassword) {
    return res.json({ isdata: false });
  }
  let { inputOldpassword, inputNewpassword } = req.body;
  let userId = req.user[0][0].id;
  try {
    let [userExist] = await connection.query(
      "select * from users where id = ?",
      [userId]
    );

    //check datbase password
    if (userExist[0].password != md5(inputOldpassword + userExist[0].salt)) {
      return res.status(401).json({
        success: false,
        message: "please input correct password",
      });
    }
    let newPassword = md5(inputNewpassword + userExist[0].salt);
    if (userExist[0].password == newPassword) {
      return res.status(401).json({
        flag: false,
        message: "new password not be same as old",
      });
    } else {
      await connection.query(`update users set password = ? where id = ?`, [
        newPassword,
        userId,
      ]);
      return res.clearCookie("token").status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      isvalidate_user: false,
      message: "something went wrong",
    });
  }
};
