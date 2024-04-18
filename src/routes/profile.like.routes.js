const {getLikes} = require('../controller/profile.like.controller');
const express = require('express');

const likeRouter = express.Router();

likeRouter.get("/profile",getLikes);

module.exports = likeRouter;