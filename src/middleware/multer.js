const multer = require('multer')
const path = require('path')
const fs = require('fs');

var imageStorage = multer.diskStorage({
  destination: function (req, files, cb) {
    let uploadDir = './public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, files, cb) {
    cb(null, Date.now() + "-" + files.originalname);
  }




})



let csvupload = multer.diskStorage({
  destination: function (req, files, cb) {
    let uploadDir = './public/csv';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, files, cb) {
    cb(null, Date.now() + "-" + files.originalname);
  }




})
function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
    req.fileValidationError = 'Please upload a valid image file'
    return cb(null, false)
  }
  cb(null, true)
}

function fileFiltercsv(req, file, cb) {
  if (!file.originalname.match(".csv")) {
    req.fileValidationError = 'Please upload a valid image file'
    return cb(null, false)
  }
  cb(null, true)
}
const upload = multer({
  storage: imageStorage,
  fileFilter: fileFilter
});
const uploadcsv = multer({
  storage: csvupload,
  // fileFilter: fileFiltercsv
});





module.exports = { upload, uploadcsv }