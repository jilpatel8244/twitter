const { CLIENT_RENEG_LIMIT } = require("tls");
const connection = require("../../config/connection");
const multer = require("multer");
const { log } = require("console");
const upload = multer({ dest: "public/uploads" });

  exports.get_editprofile = async (req,res)=>{
  const userId = req.query.id;
    console.log(userId);
    console.log(req.query);
 
  if (!userId) {
      res.send('User ID is required');
      return;
  }
try {
  
  const show_detail = 'SELECT id, username, bio, date_of_birth FROM users WHERE id = ?';
  let [show_detail_data] = await connection.query(show_detail,[userId])

  console.log(show_detail_data);

  res.render('pages/editprofile', { profileData : show_detail_data[0] });
} catch (error) {
  res.json({error:error})
  
}

};

// app.post('/updateProfile', (req, res) => {
  exports.post_updateProfile = async (req,res)=>{
  console.log("body is " , req.body);


  const userId = req.body.userId;
  console.log(userId+"-hello");
  const { username, bio, dob } = req.body;
  

  const update_detail = 'UPDATE users SET username = ?, bio = ?, date_of_birth = ? WHERE id = ?';
  // connection.query(query, [username, bio, dob, userId], (error, results) => {
    let [update_detail_data] = await connection.query(update_detail,[username, bio, dob, userId])
    console.log("detaildata"+update_detail);
      console.log('Profile data updated successfully for user ID:', userId);
      res.send('Profile data updated successfully');

};
