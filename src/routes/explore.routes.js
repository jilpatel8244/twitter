const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage, getTopTweetAndHastag, getHastag, getMedia, getLatestTweet, getUsername, getUsernameOrHastagOnchage } = require("../controller/exploreControler/getexplore");
const passport = require("passport");
const { getExploreProfile } = require("../controller/profile");
require("../middleware/permission");


const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false }), getExplorePage)
router.post("/topTweet", getTopTweetAndHastag)
router.post("/latestTweet", getLatestTweet)
router.post("/username", getUsername)
router.post("/getMedia", getMedia)
router.post("/hastag", getHastag);
router.post("/searchboxdata", getUsernameOrHastagOnchage);

router.get("/profile", passport.authenticate('jwt', { session: false }), getExploreProfile);


module.exports = router;
