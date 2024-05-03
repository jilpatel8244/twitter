const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.shareTweetHandler = async (req, res) => {
    try {
        let createdAts = [];
        let sql = `insert into direct_messages (sender_id, receiver_id, content_type, content, is_read) values (?, ?, ?, ?, ?)`;
        let sql2 = `select created_at from direct_messages where id = ?`;

        req.body.users.forEach(async (element) => {
            try {
                let [lastinsertedIdResult] = await connection.query(sql, [req.user[0][0].id, element, 'sharedTweet', req.body.link, 0]);
                let [data] = await connection.query(sql2, [lastinsertedIdResult.insertId]);
                createdAts.push(data[0].created_at);
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
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
                'created_at': ''
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