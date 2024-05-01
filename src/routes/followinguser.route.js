const express = require('express');
const passport = require("passport");
const { getFollowingData } = require('../controller/getFollowinguser.controller');

const router = express.Router();

// router.get("/followingUser",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }),getFollowingData)

module.exports = router;  