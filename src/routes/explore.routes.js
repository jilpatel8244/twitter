const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage, getTopTweetAndHastag } = require("../controller/exploreControler/getexplore");

const router = express.Router();



router.get("/", getExplorePage)


router.get("/data", getTopTweetAndHastag)


module.exports = router;
