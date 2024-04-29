const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.getMessagesPage = async (req, res) => {
    try {
        let sql = `
        select users.id, users.name, users.username, users.profile_img_url,
        CASE
            WHEN TIMESTAMPDIFF(SECOND,  max(direct_messages.created_at), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND,  max(direct_messages.created_at), NOW()), ' seconds ago')
            WHEN TIMESTAMPDIFF(MINUTE,  max(direct_messages.created_at), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE,  max(direct_messages.created_at), NOW()), ' minutes ago')
            WHEN TIMESTAMPDIFF(HOUR,  max(direct_messages.created_at), NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR,  max(direct_messages.created_at), NOW()), ' hours ago')
            ELSE CONCAT(DATE_FORMAT( max(direct_messages.created_at), '%d'), ' ', DATE_FORMAT( max(direct_messages.created_at), '%M'))
        END as time
        from users left join 
        direct_messages 
        on users.id = direct_messages.sender_id and direct_messages.receiver_id = ${req.user[0][0].id} 
        where users.id in 
        (select followers.follower_id from followers where followers.following_id = ${req.user[0][0].id} and followers.follower_id in (
            select following_id from followers where followers.follower_id = ${req.user[0][0].id} and followers.is_blocked = 0 and followers.current_status = 1
        )) group by users.id;`;

        let [allFollowers] = await connection.query(sql);

        res.render('pages/messages.ejs', {
            allFollowers: allFollowers,
            user: req.user[0][0]
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.storeMessageHandler = async (req, res) => {
    try {
        let { senderId, reciverId, message } = req.body;
        let content_type;
        
        // set content_type

        if (req.file && req.body.message) {
            content_type = 'media-text';
        } else if (req.file) {
            content_type = 'media';
        } else {
            content_type = 'text';
        }

        // entry in direct_messages table
        let sql = `insert into direct_messages (sender_id, receiver_id, content, content_type, is_read) values ( ?, ?, ?, ?, ? );`;
        let lastInsertedId = await connection.query(sql, [ senderId, reciverId, message, content_type, 0 ]);

        // entry in message_medias table

        if(content_type == 'media-text' || content_type == 'media') {
            let sql = `insert into message_medias (message_id, url) values ( ?, ? );`;
            await connection.query(sql, [ lastInsertedId[0].insertId, req.file.filename ]);
        }

        let insertedData = await connection.query(`select * from direct_messages where id = ?`, [lastInsertedId[0].insertId]);

        return res.status(200).json({
            success: true,
            message: {
                'senderId': senderId,
                'reciverId': reciverId,
                'message': message,
                'url': req.file ? (req.file.filename) : "nothing",
                'content_type': content_type,
                'created_at': insertedData[0][0].created_at
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}