const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage, getTopTweetAndHastag, getHastag, getMedia, getLatestTweet, getUsername, getUsernameOrHastagOnchage } = require("../controller/exploreControler/getexplore");
const passport = require("passport");
const { getReplies } = require("../controller/profile/profile.reply.controller");
const { getPosts } = require("../controller/profile/profile.post.controller");
const { getFollower } = require("../controller/follow.controller");
const { getLikes } = require("../controller/profile/profile.like.controller");
const { getProfile } = require("../controller/profile/profile.controller");
const {getProfileMedia} = require("../controller/profile/profile.media.controller");
require("../middleware/permission");


const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getExplorePage)
router.post("/topTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getTopTweetAndHastag)
router.post("/latestTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLatestTweet)
router.post("/username",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsername)
router.post("/getMedia",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMedia)
router.post("/hastag",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHastag);
router.post("/searchboxdata",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsernameOrHastagOnchage);

router.get("/profile", passport.authenticate('jwt', { session: false }), getProfile);
router.get("/profile/reply",getReplies);
router.get('/profile/post', getPosts);
router.get('/profile/like', getLikes);
router.get('/profile/media', getProfileMedia);
// router.get('/followandfollowing', getFollower);

module.exports = router;
