const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.notification = (req, res) => {
  res.render("pages/notification");
};
exports.getNotifications = async (req, res) => {
  let [sql] = await connection.query("select * from users join tweets;");

  let date = new Date(sql[0].created_at);
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
  let login = `There was a login to your account @${
    sql[0].username
  } from a new device on '${month}' '${date.getDate()}', '${date.getFullYear()}'. Review it now.`;

  let follow = `${sql[0].username} followed you.`;
  let like = `${sql[0].username} like your tweet. \n`;
  like += sql[0].content;
  res.status(200).json({
    success: true,
    message: "on home page",
    login,
    follow,
    like,
  });
};
