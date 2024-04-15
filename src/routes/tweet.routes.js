const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();

const { upload } = require("../middleware/multer");
const {tweetCreate,insertTweet} = require('../controller/tweet.controller');
router.get('/',tweetCreate);
router.post('/insertTweet',upload.array('media',1),insertTweet)
module.exports = router