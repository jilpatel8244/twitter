
const express = require('express');
const passport = require("passport");
const { getFollowData } = require('../controller/getFollowuser.controller');

const router = express.Router();

// router.get("/follow",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }),getFollowData)

module.exports = router;  