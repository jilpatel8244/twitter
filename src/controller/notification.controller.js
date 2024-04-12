const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.notification = (req, res) => {
  res.render("pages/notification");
};
exports.getNotifications = async (req, res) => {
  let logged_user = `select * from users where users.id = ${req.user[0][0].id}`;
  let [result_user] = await connection.query(logged_user);
  let logged_id = result_user[0].id;

  let sql = `select notifications.id as notification_id,notifications.type as notification_type, users.name, 
  users.username, users.is_active as logged_in, followers.following_id, tweets.id as tweet_id, tweets.content, tweet_likes.status as likes, tweets.created_at from notifications 
    left join users 
    on notifications.user_id = users.id 
    left join followers
    on notifications.user_id = followers.follower_id
    left join tweets
    on notifications.user_id = tweets.user_id
    left join tweet_likes
    on notifications.user_id = tweet_likes.user_id
    where users.id = ? and users.is_active = ?`;
  let [all_tweets] = await connection.query(sql, [logged_id, 1]);
  // console.log(all_tweets);

  // logins notification
  let login_notification = `select notifications.id as notification_id,notifications.type as notification_type, users.id as user_id,users.name, users.username, users.is_active as logged_in from notifications 
  left join users 
  on notifications.user_id = users.id 
  where users.id = ? `;
  let [logged_in] = await connection.query(login_notification, [2]);
  // console.log(logged_in);

  let date = new Date(all_tweets[0].created_at);
  var months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months_arr[date.getMonth()];

  let login;
  if (logged_in[0].logged_in === 1) {
    login = `There was a login to your account @${
      logged_in[0].username
    } from a new device on '${month}' '${date.getDate()}', '${date.getFullYear()}'. Review it now.`;
    // ${req.user[0][0].id}
  }

  // likes notification
  let like_notification = `select notifications.id as notification_id, notifications.related_user_id as other_user, notifications.type as notification_type, users.id as user_id, users.username,
  users.is_active as logged_in, tweets.id as tweet_id, tweets.content, tweet_likes.status as likes, tweet_likes.created_at from notifications 
  left join users 
  on notifications.user_id = users.id 
  left join tweets
  on notifications.user_id = tweets.user_id
  left join tweet_likes
  on notifications.user_id = tweet_likes.user_id
  where tweets.id = 2 and related_user_id = 2 and tweet_likes.status = 1 and  users.id = 2`;
  let [all_likes] = await connection.query(like_notification, [logged_id]);
  // console.log(all_likes);
  let who_liked = `select distinct(username) from notifications 
  left join users 
  on notifications.related_user_id = users.id 
  left join tweets
  on notifications.user_id = tweets.user_id 
  left join tweet_likes
   on notifications.user_id = tweet_likes.user_id
  where related_user_id = 1 and tweets.id = 2 and users.id = 1 and tweet_likes.status = 1 and notifications.type = "Like";`;

  let [like_result] = await connection.query(who_liked, [logged_id]);
  console.log(like_result[0].username + " liked your tweet");
  // console.log(like_result[0].username);

  // console.log(all_likes);
  let like;
  if (all_likes[0].likes === 1) {
    like = `${like_result[0].username} like your tweet. \n`;
    like += all_likes[0].content;
  }

  let follow_notification = `select notifications.related_user_id as id from notifications 
  left join users 
  on notifications.user_id = users.id 
  left join followers
  on notifications.user_id = followers.follower_id  where users.id = 2 and users.is_active = 1 and notifications.type = "Follow"`;
  let [follow_result] = await connection.query(follow_notification);

  let follower = `select * from followers join users  on followers.follower_id = users.id where followers.following_id = 2;`;
  let [get_follower] = await connection.query(follower);

  let follow;
  if (follow_result[0].id) {
    follow = `${get_follower[0].username} followed you.`;
  }

  //
  let comment_nitification = `select * from notifications 
  left join users 
  on notifications.user_id = users.id 
  left join tweet_comments
  on notifications.user_id = tweet_comments.user_id
  where users.id = 1  and users.is_active = 1 and notifications.type = "Comment";`;
  let [comment_result] = await connection.query(comment_nitification);
  console.log(comment_result);
  let comments;

  if (comment_result[0].related_user_id) {
    comments = `${comment_result[0].username} commented on your post `;
    comments +=`${comment_result[0].content}`;
  }
  res.status(200).json({
    success: true,
    message: "in X notification",
    login,
    follow,
    like,
    comments,
  });
};
