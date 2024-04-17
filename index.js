const express = require("express");
const app = express();
var http = require('http');
const server = http.createServer(app);
var {Server} = require('socket.io');

const io = new Server(server);

const cookieParser = require("cookie-parser");
const GetProfileRouter = require("./src/routes/profile.routes");
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

// app.use(authRouter);
app.use(homeRouter);
app.use("/explore", exploreRoute);
app.use(authRouter);
app.use(GetProfileRouter);
app.use(notification);
app.use("/editprofile", editprofile);
app.use('/like', passport.authenticate('jwt', { session: false}), likeRoute);
app.use('/bookmark', passport.authenticate('jwt', { session: false }), bookmarkRoute);
app.use('/messages', passport.authenticate('jwt', { session: false }), messagesRoute);



app.set("view engine", "ejs");

app.use("/tweetPost",tweetCreate);

let connectedUser = {};

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected : ', socket.id);

  // store userId and socketId when user connects
  socket.on('user-connected', async (userId) => {
    connectedUser[userId] = socket.id;
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log(connectedUser);
    console.log('A user disconnected : ', socket.id);

    for (const userId in connectedUser) {
      if (connectedUser[userId] === socket.id) {
        delete connectedUser[userId];
        break;
      }
    }

    console.log(connectedUser);
  });


  socket.on('send-private-message', async (data) => {
    const {senderId, reciverId, message} = data;

    if(connectedUser[reciverId]) {
      io.to(connectedUser[reciverId]).emit('receive-private-message', {senderId, message});
    }
  })

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
