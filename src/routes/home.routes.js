const express = require("express");
const router = express.Router();
const {getHome} = require('../controller/home.controller');

router.get("/", (req, res) => {
    res.render("pages/index");
  });

router.get("/home", getHome);

  module.exports = router;