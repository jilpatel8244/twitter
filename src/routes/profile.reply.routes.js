const {getReplies} = require('../controller/profile.reply.controller');
const express = require('express');
const passport = require("passport");

const router = express.Router();

router.get("/reply",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getReplies);

module.exports = router;