const {getTimeZone} = require('../controller/timezone.controller');

const express = require('express');

const router = express.Router();

router.get("/timezone",getTimeZone);

module.exports = router;