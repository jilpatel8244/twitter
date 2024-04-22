const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const cookieParser = require("cookie-parser");
const getProfileRouter = require("./src/routes/profile.routes");
const getTimeZone = require("./src/routes/timezone.routes");
const homeRouter = require("./src/routes/home.routes");
const notification = require("./src/routes/notification.route");
const exploreRoute = require("./src/routes/explore.routes")
const authRouter = require("./src/routes/auth.routes");
const connection = require("./config/connection");
const editprofile = require("./src/routes/editprofile.route");
const passport = require("passport");
require("./src/middleware/passport");
const bookmarkRoute = require("./src/routes/bookmark.routes");
const likeRoute = require("./src/routes/like.routes");
const messagesRoute = require("./src/routes/messages.routes");

const PORT = process.env.PORT || 3000;
const tweetCreate = require('./src/routes/tweet.routes');
const logger = require("./logger/logger");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

app.use(homeRouter);
app.use(likeRoute);
app.use(bookmarkRoute);
app.use(messagesRoute);
app.use("/explore", exploreRoute);
app.use(authRouter);
app.use(getTimeZone);
app.use(notification);
// app.use("/editprofile", editprofile);

// app.use('/profile', passport.authenticate('jwt', { session: false}), getProfileRouter);



app.set("view engine", "ejs");

app.use("/tweetPost", tweetCreate);

let connectedUser = {};

//Whenever someone connects this gets executed
io.on('connection', async function (socket) {
  logger.info('A user connected : '+ socket.id);
  
  // store userId and socketId when user connects
  socket.on('user-connected', async (userId) => {
    connectedUser[userId] = socket.id;
  });

  // to get all unread message count follower wise
  socket.on('getUnreadMessages', async (userId) => {
    try {
      let sql = `select direct_messages.sender_id, count(unread_messages.message_id) as count from unread_messages inner join direct_messages on unread_messages.message_id = direct_messages.id where user_id = ? and is_read = 0 group by direct_messages.sender_id;`;

      let data = await connection.query(sql, [userId]);
      socket.emit('unreadMessages', data[0]);
    } catch (error) {
      logger.error(error);
    }
  });

  // to update the read flag of some specific follower
  socket.on('messageRead', async (data) => {
    try {
      let sql = `update unread_messages join direct_messages on unread_messages.message_id = direct_messages.id set unread_messages.is_read = 1 where unread_messages.user_id = ? and direct_messages.sender_id = ?;`;

      await connection.query(sql, [data.senderId, data.reciverId]);
    } catch (error) {
      logger.error(error);
    }
  })

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    logger.info('A user disconnected : ', socket.id);

    for (const userId in connectedUser) {
      if (connectedUser[userId] === socket.id) {
        delete connectedUser[userId];
        break;
      }
    }
  });


  socket.on('send-private-message', async (data) => {
    const { senderId, reciverId, message, content_type } = data;
    logger.info(data);

    if (connectedUser[reciverId]) {
      io.to(connectedUser[reciverId]).emit('receive-private-message', { senderId, reciverId, message, content_type });
    }
  })

  // load old chats
  socket.on('existingChats', async (data) => {
    try {
      let sql = `select * from direct_messages where (sender_id = '${data.senderId}' and receiver_id = '${data.reciverId}') or (sender_id = '${data.reciverId}' and receiver_id = '${data.senderId}') order by created_at;`;
    
      let [oldchats] = await connection.query(sql);

      socket.emit('loadChats', { oldchats: oldchats });
    } catch (error) {
      logger.error(error);
    }
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
