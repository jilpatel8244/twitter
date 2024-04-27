const {getPosts} = require('../controller/profile.post.controller');
const express = require('express');
const passport = require("passport");

const router = express.Router();

router.get('/post',passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getPosts);
module.exports = router;