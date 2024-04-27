const express = require("express");
const router = express.Router();
const passport = require("passport");
const {get_comment, post_comment,delete_comment,edit_comment,get_notification,post_notification, getHomeForyou, getHomeFollowing, post_reply,get_reply  } = require('../controller/home.controller');


const {retweet} =require('../controller/retweet.controller');

router.get("/", (req, res) => {
  res.render("pages/index");
});


router.get("/home", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res) => {
  res.render('pages/home', {user: req.user[0][0]});
});
router.get("/getHomeForyou", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeForyou);
router.get("/getHomeFollowing", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeFollowing)



router.get("/get_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login"  }),get_notification)
router.post("/post_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login"  }),post_notification)

// router.post("/home", getHome);
router.get('/get_comments/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), get_comment);
router.post('/post_comments', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), post_comment);
router.post('/delete_comment/:id',passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), delete_comment);
router.post('/edit_comment/:id',passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), edit_comment);
router.post('/post_reply', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), post_reply);
router.post('/get_reply', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), get_reply);

router.post("/retweet",passport.authenticate('jwt', { session: false, failureRedirect: "/login" }),retweet)


module.exports = router;