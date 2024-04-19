const {getPosts} = require('../controller/profile.post.controller');
const express = require('express');

const router = express.Router();

router.get('/post', getPosts);
module.exports = router;