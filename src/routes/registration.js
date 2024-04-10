const express = require('express');
// const logger = require('../../logger/logger');
const registration = express.Router();

const { get_registration,get_password,post_registration } = require('../controller/registration');

  registration.route("/registration").get(get_registration);
  // registration.route("/password").get(get_password);
  registration.route("/registration").post(post_registration);




module.exports = registration;

