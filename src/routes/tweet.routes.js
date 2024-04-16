const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();
const passport = require("passport");

const { upload } = require("../middleware/multer");
const {tweetCreate,insertTweet, showDrafts} = require('../controller/tweet.controller');
router.get('/',passport.authenticate('jwt',{session:false}),tweetCreate);

router.post('/insertTweet',passport.authenticate('jwt',{session:false}),upload.array('media',5),insertTweet);
router.get('/displayDrafts',passport.authenticate('jwt',{session:false}),showDrafts);
module.exports = router