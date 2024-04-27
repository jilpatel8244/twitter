const express = require("express");
const logger = require("../../logger/logger");
const passport = require("passport");
const router = express.Router();
const {upload} = require("../middleware/multer")
const {getEditprofile,postUpdateProfile} = require('../controller/editprofile.controller');
router.get("/",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getEditprofile);
router.post("/updateProfile", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.fields([{name: "coverPhoto", maxCount: 1},{ name: "displayPhoto", maxCount: 1 }]), postUpdateProfile );
module.exports = router;
