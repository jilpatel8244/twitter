const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.likeUnlikeHandler = async (req, res) => {
    try {
        let {tweetId} = req.body;
        let userId = req.user[0][0].id;

        let [result] = await connection.query(`select tweet_likes.status, tweets.user_id from tweet_likes left join tweets on tweet_likes.tweet_id = tweets.id where tweet_likes.tweet_id = ? and tweet_likes.user_id = ?;
        `, [tweetId, userId]);

        if (!result.length) {
            // make new entry
            await connection.query('insert into tweet_likes (tweet_id, user_id, status) values (?, ?, ?)', [tweetId, userId, 1]);

            // get user_id whose tweet was liked
            let tweet_user_id = await connection.query('select user_id from tweets where id = ?', [tweetId]);

            // notification
            await connection.query(`INSERT INTO notifications (user_id, tweet_id, type, related_user_id) VALUES (?, ?, 'Like', ?);`, [tweet_user_id[0][0].user_id, tweetId, userId]);

            return  res.status(200).json({
                success: true,
                likeStatus: 1
            })
        } else {
            // update status
            await connection.query('update tweet_likes set status = ? where tweet_id = ? and user_id = ?', [(parseInt(result[0].status)) ? 0 : 1, tweetId, userId]);

            // notification
            if ((parseInt(result[0].status)) ? 0 : 1) {
                await connection.query(`INSERT INTO notifications (user_id, tweet_id, type, related_user_id) VALUES (?, ?, 'Like', ?);`, [result[0].user_id, tweetId, userId]);
            }
            
            return res.status(200).json({
                success: true,
                likeStatus: (parseInt(result[0].status)) ? 0 : 1
            })
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}