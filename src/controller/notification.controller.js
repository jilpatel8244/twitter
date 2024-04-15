const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getNotifications = async (req, res) => {
  let user_id = await req.user[0][0].id;
  let logged_user = `select * from users where users.id =  ?`;
  let [result_user] = await connection.query(logged_user, [user_id]);

  let logged_id = result_user[0].id;
  try {
    const userSql = `
      SELECT n.*, u.username AS user, t.content AS tweet_content
      FROM notifications n
      LEFT JOIN users u ON n.related_user_id = u.id
      LEFT JOIN tweets t ON n.tweet_id = t.id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
    `;
    const [notifications] = await connection.query(userSql, [logged_id]);
    // console.log("Raw Notifications:", notifications);

    const relatedSql = `SELECT n.*, u.username AS related_username, t.content AS tweet_content
    FROM notifications n
    LEFT JOIN users u ON n.related_user_id = u.id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    WHERE n.related_user_id = ?
    ORDER BY n.created_at DESC`;
    const [related_user_result] = await connection.query(relatedSql, [2]);
    // console.log(related_user_result);

    res.render("pages/notification", {
      notifications,
      other_users: related_user_result,
    });
  } catch (error) {
    console.error("Error while fetching notification : ", error);
    throw error;
  }
};
