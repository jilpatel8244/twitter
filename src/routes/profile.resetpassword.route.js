const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const passport = require("passport");

const {
  reset_password,
  resetpassword,
} = require("../controller/profile.resetpassword.controller");

router.get(
  "/profilepasswordreset",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  resetpassword
);

router.post(
  "/profilepasswordreset",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  reset_password
);

module.exports = router;
