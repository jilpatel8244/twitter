const express = require('express');
const {getProfile} = require('../controller/profile.controller');
const {getPosts} = require('../controller/profile.post.controller');
const {getReplies} = require('../controller/profile.reply.controller');
const {getLikes} = require('../controller/profile.like.controller');
const passport = require("passport");

const router = express.Router();

router.get("/",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getProfile);
router.get("/post",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getPosts);
router.get("/reply",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getReplies);
router.get("/like",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLikes);

module.exports = router;  