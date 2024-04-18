const {getReplies} = require('../controller/profile.reply.controller');
const express = require('express');

const replyRouter = express.Router();

replyRouter.get("/profile",getReplies);

module.exports = replyRouter;