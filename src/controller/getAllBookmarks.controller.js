const connection = require("../../config/connection");

exports.getAllBookmarks = async (req, res) => {
    try {
        // console.log(req.user);

        let sql = `select tweets.id as tweet_id, tweets.content, tweets.created_at, users.name, users.username, tweet_likes.status as isLiked, medias.media_url from bookmarks 
        left join tweets on bookmarks.tweet_id = tweets.id
        left join users on tweets.user_id = users.id
        left join tweet_likes on bookmarks.tweet_id = tweet_likes.tweet_id and bookmarks.user_id = tweet_likes.user_id
        left join medias on bookmarks.tweet_id = medias.tweet_id 
        where bookmarks.user_id = '${req.user[0][0].id}' and bookmarks.status = '1'
        ;`
        
        let [allBookmarkTweets] = await connection.query(sql);

        allBookmarkTweets = allBookmarkTweets.map((element) => {
            element.isBookmarked = 1;
            return element;
        })

        res.render('pages/bookmark', {
            allBookmarkTweets: allBookmarkTweets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went'
        })
    }
}