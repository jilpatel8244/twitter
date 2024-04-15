const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();

const { tweetCreate, insertTweet } = require('../controller/tweet.controller')

router.get('/', tweetCreate);
router.post('/insertTweet', insertTweet)
module.exports = router