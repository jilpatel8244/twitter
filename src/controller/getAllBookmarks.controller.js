const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getAllBookmarks = async (req, res) => {
    try {
        let sql = `select tweets.id as tweet_id, tweets.content, users.name, users.username, users.profile_img_url, tweet_likes.status as isLiked, medias.media_url,
        CASE
            WHEN TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()), ' seconds ago')
            WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
            WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
            ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
        END as time
        from bookmarks 
        left join tweets on bookmarks.tweet_id = tweets.id
        left join users on tweets.user_id = users.id
        left join tweet_likes on bookmarks.tweet_id = tweet_likes.tweet_id and bookmarks.user_id = tweet_likes.user_id
        left join medias on bookmarks.tweet_id = medias.tweet_id 
        where bookmarks.user_id = '${req.user[0][0].id}' and bookmarks.status = '1'
        order by bookmarks.created_at;`

        let [allBookmarkTweets] = await connection.query(sql);

        allBookmarkTweets = allBookmarkTweets.map((element) => {
            element.isBookmarked = 1;
            return element;
        });

        sql = `SELECT b.tweet_id, COALESCE(sum(l.status), 0) as likeCount FROM bookmarks b
        LEFT JOIN tweet_likes l ON l.tweet_id = b.tweet_id
        WHERE b.user_id = '${req.user[0][0].id}' AND b.status = '1'
        group by b.tweet_id`;

        let [allBookmarkTweetsLikeCount] = await connection.query(sql);

        res.render('pages/bookmark.ejs', {
            allBookmarkTweets: allBookmarkTweets,
            allBookmarkTweetsLikeCount: allBookmarkTweetsLikeCount,
            user: req.user[0][0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went'
        })
    }
}