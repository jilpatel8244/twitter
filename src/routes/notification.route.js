const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const {
  notification,
  getNotifications,
} = require("../controller/notification.controller");

router.get("/notification", notification);
router.get("/getnotification", getNotifications);
