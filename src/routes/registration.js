const express = require('express');
// const logger = require('../../logger/logger');
const registration = express.Router();

const { get_registration,get_password } = require('../controller/registration');

  registration.route("/registration").get(get_registration);
  registration.route("/password").get(get_password);



module.exports = registration;
