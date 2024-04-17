const connection = require("../../config/connection");
const multer = require("multer");


exports.getEditprofile = async (req, res) => {
  try{
  const userId = req.query.id;

  if (!userId) {
    res.send('User ID is required');
    return;
  }
  try {
    const show_detail = 'SELECT id, username, bio, date_of_birth FROM users WHERE id = ?';
    let [show_detail_data] = await connection.query(show_detail, [userId])


    res.render('pages/editprofile', { profileData: show_detail_data[0] });
  } catch (error) {
    res.json({ error: error })

  }
  }
  catch (error) {
    res.json({ error: error })

  }
};

exports.postUpdateProfile = async (req, res) => {
  try {
    const { username, bio, dob, userId } = req.body;
    console.log(req.body);
     console.log(req.files);
    let coverPhoto = req.files[0];
    console.log("coverPhoto"+coverPhoto);
    let displayPhoto = req.files[1];
    console.log("displayPhoto"+displayPhoto);

    const update_detail = 'UPDATE users SET username = ?, bio = ?, date_of_birth = ?,cover_img_url =?,profile_img_url=? WHERE id = ?';
    let [update_detail_data] = await connection.query(update_detail, [username, bio, dob, userId,coverPhoto,displayPhoto])
    console.log('Profile data updated successfully for user ID:', userId);
    res.send('Profile data updated successfully');
  } catch (error) {
    res.json({ error: error })

  }


};
