
const express = require('express');
const passport = require("passport");
const { getFollowData } = require('../controller/getFollowuser.controller');

const router = express.Router();

router.get("/follow",getFollowData)

module.exports = router;  