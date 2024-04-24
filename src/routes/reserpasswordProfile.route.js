const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const passport = require("passport");

const {
  reset_password,
  resetpassword,
} = require("../controller/resetpasswordProfile.controller");

router.get(
  "/resetprofilepassword",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  resetpassword
);

router.post(
  "/resetprofilepassword",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  reset_password
);

module.exports = router;
