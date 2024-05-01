const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getAllBookmarks = async (req, res) => {
    try {

        let sql = `select tweets.id as tweet_id,tweets.user_id, tweets.content, users.name, users.username, users.profile_img_url, tweet_likes.status as isLiked, medias.media_url,
        CASE
            WHEN TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()), ' seconds ago')
            WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
            WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
            ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
        END as time, bookmarks.status as isBookmarked 
        from bookmarks 
        left join tweets on bookmarks.tweet_id = tweets.id
        left join users on tweets.user_id = users.id
        left join tweet_likes on bookmarks.tweet_id = tweet_likes.tweet_id and bookmarks.user_id = tweet_likes.user_id
        left join medias on bookmarks.tweet_id = medias.tweet_id 
        where bookmarks.user_id = '${req.user[0][0].id}' and bookmarks.status = '1'
        ORDER BY 
        CASE
            WHEN bookmarks.updated_at IS NOT NULL THEN bookmarks.updated_at
            ELSE bookmarks.created_at
        END DESC;`

        let [allBookmarkTweets] = await connection.query(sql);

        sql = `SELECT b.tweet_id, COALESCE(sum(l.status), 0) as likeCount FROM bookmarks b
        LEFT JOIN tweet_likes l ON l.tweet_id = b.tweet_id
        WHERE b.user_id = '${req.user[0][0].id}' AND b.status = '1'
        group by b.tweet_id`;

        let [allBookmarkTweetsLikeCount] = await connection.query(sql);

        allBookmarkTweets.forEach((bookmarkElement, index) => {
            allBookmarkTweetsLikeCount.forEach((likeCountElement, index) => {
                if (bookmarkElement.tweet_id == likeCountElement.tweet_id) {
                    if (likeCountElement.likeCount == 0) {
                        bookmarkElement['likeCount'] = "";
                    } else {
                        bookmarkElement['likeCount'] = likeCountElement.likeCount;
                    }
                }
            })
        })

        res.status(200).json({
            success: true,
            message: allBookmarkTweets
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went'
        })
    }
}