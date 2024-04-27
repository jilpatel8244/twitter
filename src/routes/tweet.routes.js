const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();
const passport = require("passport");

const { upload } = require("../middleware/multer");
const {tweetCreate,insertTweet, showDrafts, tweetUpdate, displayImage, deleteDraft,getProfileImage} = require('../controller/tweet.controller');
router.get('/',passport.authenticate('jwt',{session:false}),tweetCreate);

router.post('/insertTweet',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),upload.array('media',1),insertTweet);
router.get('/displayDrafts',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),showDrafts);
router.post('/tweetUpdate',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),upload.single('media'),tweetUpdate);
router.get('/displayImage',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),displayImage)
router.post('/draftDelete',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),deleteDraft);
router.get('/profileImage',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),getProfileImage);


module.exports = router