const multer = require('multer')
const path=require('path')
const fs=require('fs');
var imageStorage= multer.diskStorage({
  destination:function(req,file,cb){
    let uploadDir= './public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null,uploadDir);
  },
  filename: function( req, file, cb){
    cb(null, Date.now()+"-"+file.originalname);
  },
  
  
})
function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return  cb(new Error('Please upload a valid image file'),flase)
  }
  cb(null, true)
}
const upload= multer({
  storage:imageStorage,
  fileFilter:fileFilter
});

module.exports={upload}