const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage, getTopTweetAndHastag, getHastag, getMedia, getLatestTweet, getUsername, getUsernameOrHastagOnchage } = require("../controller/exploreControler/getexplore");
const passport = require("passport");
const { getExploreProfile } = require("../controller/profile");
require("../middleware/permission");


const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getExplorePage)
router.post("/topTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getTopTweetAndHastag)
router.post("/latestTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLatestTweet)
router.post("/username",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsername)
router.post("/getMedia",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMedia)
router.post("/hastag",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHastag);
router.post("/searchboxdata",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsernameOrHastagOnchage);

router.get("/profile", passport.authenticate('jwt', { session: false }), getExploreProfile);


module.exports = router;
