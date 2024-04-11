const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();

const {tweetCreate} = require('../controller/tweet.controller')

router.get('/',tweetCreate);

module.exports = router