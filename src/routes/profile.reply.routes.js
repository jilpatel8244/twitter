const {getReplies} = require('../controller/profile.reply.controller');
const express = require('express');

const router = express.Router();

router.get("/reply",getReplies);

module.exports = router;