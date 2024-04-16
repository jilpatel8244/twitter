const {getProfile} = require('../controller/profile.controller');
const express = require('express');

const router = express.Router();

router.get("/profile",getProfile);

module.exports = router;