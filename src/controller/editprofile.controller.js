const connection = require("../../config/connection")


exports.get_editprofile = async (req,res)=>{
  res.render('../views/pages/editprofile');
}

exports.post_editprofile = async (req,res)=>{
  let id = req.params.id;
  let {username,bio,dob} = req.body;
  
  let update_detail = `SELECT username,bio,dob FROM users where id=?;`
  let [update_detail_data] = await db.query(update_detail,[id]);
  console.log(update_detail_data);
}