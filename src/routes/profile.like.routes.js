const {getLikes} = require('../controller/profile.like.controller');
const express = require('express');
const passport = require("passport");

const likeRouter = express.Router();

likeRouter.get("/profile", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLikes);

module.exports = likeRouter;