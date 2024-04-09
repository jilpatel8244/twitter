const express = require("express");
const logger = require("../../logger/logger");
const router = express.Router();

router.get("/", (req, res) => {
  logger.info("information");
  res.render("pages/demo");
});

router.get("/login", (req, res) => {
  logger.info("in login page");
  res.render("pages/login");
});
module.exports = router;
