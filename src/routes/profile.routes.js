const express = require('express');
const {getProfile} = require('../controller/profile.controller');
const {getPosts} = require('../controller/profile.post.controller');
const {getReplies} = require('../controller/profile.reply.controller');
const {getLikes} = require('../controller/profile.like.controller');

const router = express.Router();

router.get("/",getProfile);

module.exports = router;  