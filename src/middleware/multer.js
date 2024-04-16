const multer = require('multer')
const path=require('path')
const fs=require('fs');
var imageStorage= multer.diskStorage({
  destination:function(req,file,cb){
    console.log('here');
    let uploadDir= './public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null,uploadDir);
  },
  filename: function( req, file, cb){
    cb(null, Date.now()+file.originalname);
  }
})

const upload= multer({storage:imageStorage});

module.exports={upload}