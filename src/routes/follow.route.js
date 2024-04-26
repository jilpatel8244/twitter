const express = require('express');
const { followUnfollowHandler } = require('../controller/getFollow.controller');
const router = express.Router();
const passport = require("passport");
require("../middleware/passport");

// Route to handle follow/unfollow actions
router.post('/follow', passport.authenticate('jwt', { session: false }),followUnfollowHandler);

module.exports = router;