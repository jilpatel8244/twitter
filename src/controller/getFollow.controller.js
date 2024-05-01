const connection = require("../../config/connection");

exports.followUnfollowHandler = async (req, res) => {
    try {
        const id = req.body.id;

        const followerId = req.user[0][0].id; 
       // const followerId =13;
      let [result] = await connection.query(`
            SELECT current_status
            FROM followers
            WHERE following_id = ? AND follower_id = ?
        `, [id, followerId]);
        let currentStatus;
        console.log("result here:",result[0])
        let statusdata =1|| result[0].current_status;
        
    if(!result.length){
    
            await connection.query(
            `INSERT INTO followers (following_id, follower_id, is_blocked, current_status)
                   VALUES (?, ?, 0, 1)`,
            [id, followerId]
        );
        currentStatus =1;
        console.log("new follower added",add)
}else{
    statusdata =result[0].current_status;
    console.log("how are you all here")
    currentStatus = result[0].current_status === 1 ? 0 : 1;
    await connection.query(`
    UPDATE followers
    SET current_status = ?
    WHERE following_id = ? AND follower_id = ?
`, [currentStatus, id, followerId]);
console.log('Follower changed their status.');
}
    

        return res.status(200).json({
            success: true,
            message: "Followed successfully",statusdata
            
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred",statusdata
        });
    }
}


