const express = require("express");
const logger = require("../../logger/logger");
const router = express.Router();


router.get("/", (req, res) => {
    logger.info("information");
    res.render("pages/index");
  });

router.get("/home", (req, res) => {
    res.render("pages/home");
  });

  module.exports = router;