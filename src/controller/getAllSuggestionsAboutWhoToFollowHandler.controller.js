const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getAllSuggestionsAboutWhoToFollowHandler = async (req, res) => {
    try {
        let sql;
        let data;

        if (!parseInt(req.body.showMore)) {
            sql = `
                (select distinct tweets.user_id from tweets
                join tweet_likes on tweets.id = tweet_likes.tweet_id and tweet_likes.user_id = ${req.user[0][0].id} and tweet_likes.status = 1
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct tweets.user_id from tweets
                join tweet_comments on tweets.id = tweet_comments.tweet_id and tweet_comments.user_id = ${req.user[0][0].id} and tweet_comments.deleted_at is null 
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct tweets.user_id from tweets
                join bookmarks on tweets.id = bookmarks.tweet_id and bookmarks.user_id = ${req.user[0][0].id} and bookmarks.status = 1
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct follower_id from followers 
                where following_id in (select follower_id from followers where following_id = ${req.user[0][0].id}) and follower_id not in (${req.user[0][0].id}) and follower_id not in (select follower_id from followers where following_id = ${req.user[0][0].id})) limit 3;
            `;

            data = await connection.query(sql);
            
        } else {
            sql = `
                (select distinct tweets.user_id from tweets
                join tweet_likes on tweets.id = tweet_likes.tweet_id and tweet_likes.user_id = ${req.user[0][0].id} and tweet_likes.status = 1
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct tweets.user_id from tweets
                join tweet_comments on tweets.id = tweet_comments.tweet_id and tweet_comments.user_id = ${req.user[0][0].id} and tweet_comments.deleted_at is null 
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct tweets.user_id from tweets
                join bookmarks on tweets.id = bookmarks.tweet_id and bookmarks.user_id = ${req.user[0][0].id} and bookmarks.status = 1
                where tweets.user_id not in (${req.user[0][0].id}) and tweets.user_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}))
                union
                (select distinct follower_id from followers 
                where following_id in (select follower_id from followers where following_id = ${req.user[0][0].id}) and follower_id not in (${req.user[0][0].id}) and follower_id not in (select follower_id from followers where following_id = ${req.user[0][0].id}));
            `;

            data = await connection.query(sql);

        }

        res.status(200).json({
            success: true,
            message: data
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}