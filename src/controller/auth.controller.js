const logger = require("../../logger/logger");
const connection = require("../../config/connection");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const md5 = require("md5");

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
      await connection.query(
        "insert into logs (user_id, is_successfull) values (?, ?)",
        [userExist[0].id, 0]
      );
      return res.status(401).json({
        success: false,
        message: "user not activated",
      });
    }

    console.log(md5(password + userExist[0].salt));
    console.log(userExist[0].password);

    if (userExist[0].password !== md5(password + userExist[0].salt)) {
      await connection.query(
        "insert into logs (user_id, is_successfull) values (?, ?)",
        [userExist[0].id, 0]
      );
      return res.status(401).json({
        success: false,
        message: "password not match",
      });
    }

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
    };

    await connection.query(
      "insert into logs (user_id, is_successfull) values (?, ?)",
      [userExist[0].id, 1]
    );
    await connection.query(
      `INSERT INTO notifications (user_id, type, related_user_id)
        VALUES (?, 'Login', ?)`,
      [userExist[0].id, userExist[0].id]
    );
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
exports.USER_NAME_EXIST = async (req, res) => {
  let { username } = req.body;
  if (username.trim() == "" || username.trim().length < 3) {
    return res
      .status(422)
      .json({ error: "Please enter Username more than 3 letters" });
  } else {
    let sql = "select count(*) as count from users where username = ?";
    let [findUser] = await conn.query(sql, username);

    logger.info(findUser[0].count);
    if (findUser[0].count > 0) {
      return res.status(422).json({ isValid: false });
    } else {
      return res.status(200).json({ isValid: true });
    }
  }
};
