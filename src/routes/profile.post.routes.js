const {getPosts} = require('../controller/profile.post.controller');
const express = require('express');

const postRouter = express.Router();

// postRouter.get("/profile",getPosts);
postRouter.get('/post', getPosts);
module.exports = postRouter;