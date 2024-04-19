const {getReplies} = require('../controller/profile.reply.controller');
const express = require('express');

const replyRouter = express.Router();

replyRouter.get("/reply",getReplies);

module.exports = replyRouter;