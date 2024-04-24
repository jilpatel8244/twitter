const express = require('express');
const { followUnfollowHandler } = require('../controller/getFollow.controller');
const router = express.Router();


// Route to handle follow/unfollow actions
router.post('/',followUnfollowHandler);

module.exports = router;