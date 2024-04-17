const express = require("express");
const app = express();
var http = require('http');
const server = http.createServer(app);
var {Server} = require('socket.io');

const io = new Server(server);
const cookieParser = require("cookie-parser");
const getProfileRouter = require("./src/routes/profile.routes");
const getTimeZone = require("./src/routes/timezone.routes");
const bodyParser = require("body-parser");
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
const tweetCreate=require('./src/routes/tweet.routes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

app.use(homeRouter);
app.use("/explore", exploreRoute);
app.use(authRouter);
app.use(getTimeZone);
app.use(notification);
app.use("/editprofile", editprofile);
app.use('/profile', passport.authenticate('jwt', { session: false}), getProfileRouter);
app.use('/like', passport.authenticate('jwt', { session: false}), likeRoute);
app.use('/bookmark', passport.authenticate('jwt', { session: false }), bookmarkRoute);
app.use('/messages', passport.authenticate('jwt', { session: false }), messagesRoute);



app.set("view engine", "ejs");

app.use("/tweetPost",tweetCreate);
//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  // chatting implementation
  socket.on('newChat', (data) => {
    socket.broadcast.emit('loadNewChat', data);
  });

  // load old chats
  socket.on('existingChats', async (data) => {
    let sql = `select * from direct_messages where (sender_id = '${data.senderId}' and receiver_id = '${data.reciverId}') or (sender_id = '${data.reciverId}' and receiver_id = '${data.senderId}') order by created_at;`;
    let [oldchats] = await connection.query(sql);
    
      socket.emit('loadChats', {oldchats: oldchats});
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
