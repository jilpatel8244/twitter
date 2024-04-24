const connection = require("../../config/connection");

let md5 = require("md5");

exports.resetpassword = async (req, res) => {
  res.render("pages/resetpasswordProfile");
};

exports.reset_password = async (req, res) => {
  const data = req.body;
  let userId = req.user[0][0].id;
  const oldPassword = data.inputOldpassword;
  const newPassword = data.inputNewpassword;
  try {
    let [userExist] = await connection.query(
      "select * from users where id = ?",
      [userId]
    );
    console.log(userExist, data);
    if (!userExist.length) {
      return res.status(401).json({
        success: false,
        message: "sorry, we couldn't find your account",
      });
    }

    if (!userExist[0].is_active) {
      await connection.query(
        "insert into logs (user_id, is_successfull) values (?, ?)",
        [userExist[0].id, 0]
      );

      return res.status(401).json({
        success: false,
        message: "please activate your account",
      });
    }

    console.log("old " + userExist[0].password);

    //check datbase password
    const newPassword = md5(newPassword + userExist[0].salt);
    const [checkOldpassword] = await connection.query(`select`);
    if (userExist[0].password == md5(newPassword + userExist[0].salt)) {
      return res.status(401).json({
        success: false,
        message: "please input correct password",
      });
    } else {
      await connection.query(`update users set password = ? where id = ?`, [
        newPassword,
        userId,
      ]);
      return res.status(500).json({
        success: true,
        message: "Password updated successfully",
      });
    }

    // if (userExist[0].password !== md5(password + userExist[0].salt)) {
    //   await connection.query(
    //     "insert into logs (user_id, is_successfull) values (?, ?)",
    //     [userExist[0].id, 0]
    //   );

    //   return res.status(401).json({
    //     success: false,
    //     message: "please fill valid data",
    //   });
    // }

    // let payload = {
    //   id: userExist[0].id,
    //   email: userExist[0].email,
    //   userName: userExist[0].user_name,
    //   roleId: userExist[0].role_id,
    // };

    // const TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    // let options = {
    //   httpOnly: true,
    // };

    // await connection.query(
    //   "insert into logs (user_id, is_successfull) values (?, ?)",
    //   [userExist[0].id, 1]
    // );
    // await connection.query(
    //   `INSERT INTO notifications (user_id, type, related_user_id) VALUES (?, 'Login', ?)`,
    //   [userExist[0].id, userExist[0].id]
    // );

    return res.status(500).json({
      success: true,
      message: "everything is okay",
    });
  } catch (error) {
    // logger.error(error);

    return res.status(500).json({
      success: false,
      isvalidate_user: false,
      message: "something went wrong",
    });
  }
};
