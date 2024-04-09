const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const get_registration = async (req, res) => {
  {
    res.render("pages/registration");
  }
};
const get_password = async (req, res) => {
  {
    res.render("pages/password");
  }
};
module.exports = {
  get_registration,get_password
};