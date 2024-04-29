const express = require('express');
const passport = require("passport");
const { getFollowingData } = require('../controller/getFollowinguser.controller');

const router = express.Router();

router.get("/following",getFollowingData)

module.exports = router;  