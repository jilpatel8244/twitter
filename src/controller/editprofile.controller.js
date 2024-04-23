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
    const show_detail = 'SELECT * FROM users WHERE id = ?';
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
      const { name, bio, dob, userId } = req.body;

      let coverPhotoUrl = null;
      let displayPhotoUrl = null;

      if (req.files['coverPhoto']) {
          const coverPhoto = req.files['coverPhoto'][0];
          coverPhotoUrl = coverPhoto.filename;
      }

      if (req.files['displayPhoto']) {
          const displayPhoto = req.files['displayPhoto'][0];
          displayPhotoUrl = displayPhoto.filename;
      }

      if (coverPhotoUrl && displayPhotoUrl) {
        const updateDetail = 'UPDATE users SET name = ?, bio = ?, date_of_birth = ?, cover_img_url = ?, profile_img_url = ? WHERE id = ?';
        await connection.query(updateDetail, [name, bio, dob, coverPhotoUrl, displayPhotoUrl, userId]);
      } else if (coverPhotoUrl) {
        const updateDetail = 'UPDATE users SET name = ?, bio = ?, date_of_birth = ?, cover_img_url = ? WHERE id = ?';
        await connection.query(updateDetail, [name, bio, dob, coverPhotoUrl, userId]);
      } else if (displayPhotoUrl) {
        const updateDetail = 'UPDATE users SET name = ?, bio = ?, date_of_birth = ?, profile_img_url = ? WHERE id = ?';
        await connection.query(updateDetail, [name, bio, dob, displayPhotoUrl, userId]);
      }
      else
      {
          console.log("hello world");
        const updateDetail = 'UPDATE users SET name = ?, bio = ?, date_of_birth = ?WHERE id = ?';
        await connection.query(updateDetail, [name, bio, dob,  userId]);
      }
    
      res.redirect("/profile");
  } catch (error) {
      console.error('Error updating profile data:', error);
      res.json({ error: error });
  }
};


