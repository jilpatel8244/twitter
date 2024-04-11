const connection = require("../../config/connection");

exports.getAllBookmarks = async (req, res) => {
    
    // query baki

    let sql = `select tweets.content, tweets.created_at, medias.media_url, users.name, users.username, tweet_likes.status as isLiked
    from bookmarks 
    left join tweets 
    on bookmarks.tweet_id = tweets.id 
    left join medias
    on tweets.id = medias.tweet_id 
    left join users
    on tweets.user_id = users.id
    left join tweet_likes
    on tweets.id = tweet_likes.tweet_id
    where bookmarks.user_id = '${req.user[0][0].id}' and bookmarks.status = '1';`;                                                                                                                                                                                                                                                                                         

    let [allBookmarkTweets] = await connection.query(sql);

    allBookmarkTweets = allBookmarkTweets.map((element) => {
        element.isBookmarked = 1;
        return element;
    })

    console.log(allBookmarkTweets);

    res.render('pages/bookmark', {
        allBookmarkTweets: allBookmarkTweets
    });
}