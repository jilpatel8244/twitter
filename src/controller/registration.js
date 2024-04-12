const db = require('../../config/connection');
const ShortUniqueId = require('short-unique-id');

function randomCode(l){
  let randomString = new ShortUniqueId({ length: l });
  let randomStringOutput = randomString.rnd();
  return randomStringOutput;
}

exports.get_registration = async (req,res)=>{
  res.render('../views/pages/registration');
}

// exports.post_registration = async (req,res)=>{
//   let {name, email, dob} = req.body;
  
//   let activationCode = randomCode(12);  
//   let salt = randomCode(4);
  
//   let check_registration_query = `SELECT count(*) as count  FROM users where email = ?;`
//   let [check_registration_data] = await db.query(check_registration_query,[email]);
//   if(check_registration_data[0].count == 1){
//      return res.json({isvalidate:false});
//   }else{
//     let registration_query = `INSERT INTO users(name, email, date_of_birth, activation_code, salt) VALUES(?,?,?,?,?);`
//     let [registration_data] = await db.query(registration_query,[name,email,dob,activationCode,salt]);
//     return res.json({isValidate:true, "activationCode": activationCode});
//   }
// }



  // let check_registration_query = `SELECT count(*) as count  FROM users where email = '${email}';`
  // let [check_registration_data] = await db.query(check_registration_query);

  // if (check_registration_data[0].count == 1) {
  //   return res.json({ isvalidate: false })
  // } else {
  //   let registration_query = `INSERT INTO users(name, email, date_of_birth, activation_code) VALUES(?,?,?,?,?);`
  //   let registration_data = await db.query(registration_query, [name, email, dob, activation_code, salt]);
  //   return res.json({ isvalidate: true })
  // }


exports.get_password = async (req,res)=>{
  res.render("pages/password");
}
