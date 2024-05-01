// // starting of jil patel routes

// // share routes
// router.get("/getAllFollowersList", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllFollowersList);
// router.post("/shareTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), shareTweetHandler);

// // message routes
// router.get("/messages", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMessagesPage);
// router.post("/messages/storeMessage", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.single('imgFile'), storeMessageHandler);

// // like routes
// router.post('/like', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), likeUnlikeHandler);

// // bookmark routes
// router.get('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res) => {
//     res.render('pages/bookmark.ejs', { user: req.user[0][0] });
// })
// router.get('/getAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllBookmarks);
// router.post('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), bookmarkUnbookmarkHandler);

// router.post('/removeAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), removeAllBookmarkHandler);


// // end of jil patel routes