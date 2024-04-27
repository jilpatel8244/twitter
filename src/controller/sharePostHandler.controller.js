const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.shareTweetHandler = async (req, res) => {
    try {
        let sql = `insert into direct_messages (sender_id, receiver_id, content_type, content) values (?, ?, ?, ?)`;

        req.body.users.forEach(async (element) => {
            let [lastInsertedId] = await connection.query(sql, [req.user[0][0].id, element, 'text', req.body.link]);

            await connection.query(`insert into unread_messages (user_id, message_id, is_read) values (?, ?, ?)`, [element, lastInsertedId.insertId, 0]);
        });

        console.log(req.body);

        res.status(200).json({
            success: true,
            message: "tweet send successfully"
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}