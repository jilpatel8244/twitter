const db = require('../../config/connection');
const ShortUniqueId = require('short-unique-id');

<<<<<<< HEAD
function randomCode(l){
  let randomString = new ShortUniqueId({ length: l });
  let randomStringOutput = randomString.rnd();
  return randomStringOutput;
}

exports.get_registration = async (req,res)=>{
  res.render('../views/pages/registration');
}

exports.post_registration = async (req,res)=>{
  let {name, email, dob} = req.body;
  
  let activationCode = randomCode(12);  
  let salt = randomCode(4);
  
  let check_registration_query = `SELECT count(*) as count  FROM users where email = ?;`
  let [check_registration_data] = await db.query(check_registration_query,[email]);
  if(check_registration_data[0].count == 1){
     return res.json({isvalidate:false});
  }else{
    let registration_query = `INSERT INTO users(name, email, date_of_birth, activation_code, salt) VALUES(?,?,?,?,?);`
    let [registration_data] = await db.query(registration_query,[name,email,dob,activationCode,salt]);
    return res.json({isValidate:true, "activationCode": activationCode});
=======
function randomValue(length) {
  let salt;
  for (let i = 0; i < length; i++) {
    salt += arr[Math.floor(Math.random() * 62)];
  }
  return salt;
}

exports.post_registration = async (req, res) => {
  let { name, email, dob } = req.body;

  //shor id genratt
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let salt = "";
  let activation_code = "";
  for (let i = 0; i < 4; i++) {
    salt += arr[Math.floor(Math.random() * 62)];
  }
  for (let i = 0; i < 12; i++) {
    activation_code += arr[Math.floor(Math.random() * 62)];
  }

  let check_registration_query = `SELECT count(*) as count  FROM users where email = '${email}';`
  let [check_registration_data] = await db.query(check_registration_query);

  if (check_registration_data[0].count == 1) {
    return res.json({ isvalidate: false })
  } else {
    let registration_query = `INSERT INTO users(name, email, date_of_birth, activation_code) VALUES(?,?,?,?,?);`
    let registration_data = await db.query(registration_query, [name, email, dob, activation_code, salt]);
    return res.json({ isvalidate: true })
>>>>>>> development
  }
}

<<<<<<< HEAD
=======
}
exports.get_password = async (req,res)=>{
  res.render("pages/password");
}
>>>>>>> development
