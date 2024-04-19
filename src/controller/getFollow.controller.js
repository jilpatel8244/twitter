const connection = require("../../config/connection");

exports.followUnfollowHandler = async (req, res) => {
    try {
        // Assign user IDs directly
        let userIdToFollow = 1;
        let followerId = 3;

        // Execute the SQL query to check the current status of the relationship
        let [result] = await connection.query(`
            SELECT current_status
            FROM followers
            WHERE following_id = ? AND follower_id = ?
        `, [userIdToFollow, followerId]);

        let currentStatus;
        if (!result.length) {
            // If no existing relationship, insert a new one
            await connection.query(`
                INSERT INTO followers (following_id, follower_id, is_blocked, current_status)
                VALUES (?, ?, 0, 1)
            `, [userIdToFollow, followerId]);
            currentStatus = 1; // Set current status to 1 (active)
            console.log('New follower inserted.');
        } else {
            // If relationship exists, toggle current status
            currentStatus = result[0].current_status === 1 ? 0 : 1;

            // Update the current status in the database
            await connection.query(`
                UPDATE followers
                SET current_status = ?
                WHERE following_id = ? AND follower_id = ?
            `, [currentStatus, userIdToFollow, followerId]);
            console.log('Follower changed their status.');
        }

        // Send response back to the client with the current follow status
        return res.status(200).json({
            success: true,
            followStatus: currentStatus
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};
