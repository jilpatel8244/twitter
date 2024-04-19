const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();
const passport = require("passport");

const { upload } = require("../middleware/multer");
const {tweetCreate,insertTweet, showDrafts, tweetUpdate, displayImage, deleteDraft} = require('../controller/tweet.controller');
router.get('/',passport.authenticate('jwt',{session:false}),tweetCreate);

router.post('/insertTweet',passport.authenticate('jwt',{session:false}),upload.array('media',1),insertTweet);
router.get('/displayDrafts',passport.authenticate('jwt',{session:false}),showDrafts);
router.post('/tweetUpdate',passport.authenticate('jwt',{session:false}),upload.single('media'),tweetUpdate);
router.get('/displayImage',passport.authenticate('jwt',{session:false}),displayImage)
router.post('/draftDelete',passport.authenticate('jwt',{session:false}),deleteDraft);

module.exports = router