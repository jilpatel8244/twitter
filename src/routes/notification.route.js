const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const passport = require("passport");

const {
  notification,
  getNotifications,
} = require("../controller/notification.controller");

router.get(
  "/notifications",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  notification
);

router.get(
  "/notification",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  getNotifications
);

module.exports = router;
