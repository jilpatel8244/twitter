const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getHome,likeUnlikeHandler,bookmarkUnbookmarkHandler,comment } = require('../controller/home.controller');



router.get("/", (req, res) => {
  res.render("pages/index");
});
// router.post("/home_bookamrkUnbookmarkHandler", bookmarkUnbookmarkHandler)
// router.post("/like", likeUnlikeHandler);
router.get("/home", passport.authenticate('jwt', { session: false }), getHome);
router.post('/comments',passport.authenticate('jwt', { session: false }), comment);

module.exports = router;