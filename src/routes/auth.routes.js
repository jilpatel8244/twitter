const express = require('express');
const logger = require('../../logger/logger');
const router = express.Router();

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})


module.exports = router;