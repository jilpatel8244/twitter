const connection = require("../../config/connection");

exports.followUnfollowHandler = async (req, res) => {
    try {
        const followerId = req.body.id;

        const id = req.user[0][0].id;

        let [result] = await connection.query(`
            SELECT current_status
            FROM followers
            WHERE following_id = ? AND follower_id = ?
        `, [ followerId,id]);
        let currentStatus;
        let statusdata = 1 || result[0].current_status;

        if (!result.length) {

            await connection.query(
                `INSERT INTO followers (following_id, follower_id, is_blocked, current_status)
                   VALUES (?, ?, 0, 1)`,
                   [ followerId,id]
            );
            await connection.query(
                `INSERT INTO notifications (user_id, type, related_user_id)
                VALUES (?, 'Follow', ?);`,
                [ followerId,id]
            );
            currentStatus = 1;
          
        } else {
            statusdata = result[0].current_status;

            currentStatus = result[0].current_status === 1 ? 0 : 1;
            await connection.query(`
    UPDATE followers
    SET current_status = ?
    WHERE following_id = ? AND follower_id = ?
`, [currentStatus, followerId,id]);
await connection.query(
    `INSERT INTO notifications (user_id, type, related_user_id)
    VALUES (?, 'Follow', ?);`,
    [ followerId,id]
);
        }


        return res.status(200).json({
            success: true,
            message: currentStatus
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error has occurred"
        });
    }
}


