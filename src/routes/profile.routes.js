const express = require('express');
const { getProfile } = require('../controller/profile/profile.controller');
const { getPosts } = require('../controller/profile/profile.post.controller');
const { getReplies } = require('../controller/profile/profile.reply.controller');
const { getLikes } = require('../controller/profile/profile.like.controller');
const passport = require("passport");
const { getProfileMedia } = require('../controller/profile/profile.media.controller');

const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getProfile);
router.get("/post", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getPosts);
router.get("/reply", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getReplies);
router.get("/like", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLikes);
router.get("/media", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getProfileMedia);

module.exports = router;  