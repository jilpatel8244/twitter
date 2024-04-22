const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getHome, get_comment, post_comment,get_notification,post_notification } = require('../controller/home.controller');



router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/home", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHome);
router.get("/get_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login"  }),get_notification)
router.post("/post_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login"  }),post_notification)

// router.post("/home", getHome);
router.get('/get_comments/:id', passport.authenticate('jwt', { session: false }), get_comment);
router.post('/post_comments', passport.authenticate('jwt', { session: false }), post_comment);
router.post('/post_reply', passport.authenticate('jwt', { session: false }), post_comment);


module.exports = router;