const connection = require('../../config/connection');
const ShortUniqueId = require('short-unique-id');

function randomCode(l) {
  let randomString = new ShortUniqueId({ length: l });
  let randomStringOutput = randomString.rnd();
  return randomStringOutput;
}

exports.get_registration = async (req, res) => {
  try {
    res.render('../views/pages/registration');
  } catch (error) {
    console.log(error);
  }
}

exports.post_registration = async (req, res) => {

  try {
    let { name, email, dob, username } = req.body;
    let activationCode = randomCode(12);
    let salt = randomCode(4);
    let check_registration_query = `SELECT count(*) as count  FROM users where email = ?;`
    let [check_registration_data] = await connection.query(check_registration_query, [email]);
    if (check_registration_data[0].count == 1) {
      return res.json({ isvalidate: false });
    } else {
      try {
        let registration_query = `INSERT INTO users(name, email, date_of_birth, activation_code, salt, username,role_id) VALUES(?,?,?,?,?,?,1);`
        let [registration_data] = await connection.query(registration_query, [name, email, dob, activationCode, salt, username]);
        return res.json({ isValidate: true, "activationCode": activationCode });
      } catch (error) {
        return res.json({ error: error })
      }
    }
  } catch (error) {
    console.log(error);
  }
}
exports.USER_NAME_EXIST = async (req, res) => {

	let { username } = req.body;
 
	if (username.trim() == "" || username.trim().length < 3) {
		return res
			.status(422)
			.json({ error: "Please enter Username more than 3 letters" });
	} else {
		let sql = "select count(*) as count from users where username = ?";
		let [findUser] = await connection.query(sql, username);

		if (findUser[0].count > 0) {
			return res.status(422).json({ isValid: false });
		} else {
			return res.status(200).json({ isValid: true });
		}
	}
};



