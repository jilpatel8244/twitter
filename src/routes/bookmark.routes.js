const express = require("express");
const { getAllBookmarks } = require("../controller/getAllBookmarks.controller");
const { bookmarkUnbookmarkHandler } = require("../controller/bookmarkUnbookmarkHandler.controller");
const passport = require("passport");
require("../middleware/passport");
const router = express.Router();

router.get('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res) => {
    res.render('pages/bookmark.ejs', {user: req.user[0][0]});
})
router.get('/getAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllBookmarks);
router.post('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), bookmarkUnbookmarkHandler);

module.exports = router;