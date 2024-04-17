const express = require("express");
const logger = require("../../logger/logger");
const router = express.Router();
const {upload} = require("../middleware/multer")
const {getEditprofile,postUpdateProfile} = require('../controller/editprofile.controller');
router.get("/", getEditprofile);
router.post("/updateProfile",upload.fields([{name: "coverPhoto", maxCount: 1},{ name: "displayPhoto", maxCount: 1 }]), postUpdateProfile );
module.exports = router;
