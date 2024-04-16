const express = require("express");
const router = express.Router();
const { getHome } = require('../controller/home.controller');
const { likeUnlikeHandler } = require("../controller/likeUnlikeHandler");
const { getAllBookmarks } = require("../controller/getAllBookmarks.controller");
const { bookmarkUnbookmarkHandler } = require("../controller/bookmarkUnbookmarkHandler.controller");
const { get_retweet, post_retweet } = require("../controller/retweet.controller");


router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/allbookmark", getAllBookmarks);
router.post("/blaa", bookmarkUnbookmarkHandler)
// router.post("/like", likeUnlikeHandler);
router.get("/home", getHome);

module.exports = router;