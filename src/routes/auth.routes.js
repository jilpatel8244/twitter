const express = require('express');
const logger = require('../../logger/logger');
const router = express.Router();
const {SET_USER_NAME_PAGE} = require('../controller/auth.controller')

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})
router.get("/setUserName",SET_USER_NAME_PAGE)

module.exports = router;