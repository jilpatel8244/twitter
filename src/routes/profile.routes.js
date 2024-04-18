const express = require('express');
const {getProfile} = require('../controller/profile.controller');
const {getPosts} = require('../controller/profile.post.controller');
const {getReplies} = require('../controller/profile.reply.controller');
const {getLikes} = require('../controller/profile.like.controller');

const router = express.Router();

router.get("/",getProfile);
router.get('/post', getPosts);
router.get('/reply', getReplies);
router.get('/likes', getLikes);

module.exports = router;  