const connection = require("../../config/connection")


exports.get_editprofile = async (req,res)=>{
  res.render('../views/pages/editprofile');
}