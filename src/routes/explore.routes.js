const express = require("express");
const logger = require("../../logger/logger");
const { getExplorePage } = require("../controller/exploreControler/getexplore");

const router = express.Router();



router.get("/", getExplorePage)

router.get("/",)

module.exports = router;
