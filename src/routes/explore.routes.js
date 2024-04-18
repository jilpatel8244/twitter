const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage, getTopTweetAndHastag } = require("../controller/exploreControler/getexplore");
const passport = require("passport");
require("../middleware/passport");


const router = express.Router();



router.get("/", passport.authenticate('jwt', { session: false }), getExplorePage)


router.post("/data", getTopTweetAndHastag)


module.exports = router;
