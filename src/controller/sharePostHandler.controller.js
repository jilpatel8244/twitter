const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.shareTweetHandler = async (req, res) => {
    try {
        let sql = `insert into direct_messages (sender_id, receiver_id, content_type, content, is_read) values (?, ?, ?, ?, ?)`;

        req.body.users.forEach(async (element) => {
            await connection.query(sql, [req.user[0][0].id, element, 'sharedTweet', req.body.link, 0]);
        });

        res.status(200).json({
            success: true,
            message: "",
            message: {
                'senderId': req.user[0][0].id,
                'reciverId': req.body.users,
                'content': req.body.link,
                'url': "nothing",
                'content_type': 'sharedTweet',
                'created_at': null
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}