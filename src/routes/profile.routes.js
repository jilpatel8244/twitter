const {getProfile} = require('../controller/profile.controller');
const express = require('express');

const router = express.Router();

router.get("/",getProfile);

module.exports = router;