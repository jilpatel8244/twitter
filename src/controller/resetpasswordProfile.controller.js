const connection = require("../../config/connection");

let md5 = require("md5");

 
exports.resetpassword = async (req, res) => {
  res.render("pages/resetpasswordProfile");
};

exports.reset_password = async (req, res) => {
  if (!req.body.inputEmail && !req.body.inputPassword && !req.body.activeCode) {
    return res.json({ isvalidate_user: false });
  }

  let { inputEmail, inputPassword, activeCode } = req.body;

  async function get_data(inputEmail) {
    let sql = ` select *  from users  WHERE email = '${inputEmail}' and is_active = 1 `;

    let [result] = await connection.query(sql);
    return result;
  }

  let result = await get_data(inputEmail);

  inputPassword += result[0].salt; //result.solt to result[0].salt

  inputPassword = md5(inputPassword);

  console.log(inputEmail, inputPassword, result.salt);
  async function update_email(inputEmail, inputPassword) {
    let sql = ` UPDATE users SET password ='${inputPassword}'  WHERE email = '${inputEmail}'`;

    let [result] = await connection.query(sql);

    return result;
  }

  await update_email(inputEmail, inputPassword);

  return res.json({ isvalidate_user: true });
};
