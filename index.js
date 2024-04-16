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
const editprofile = require("./src/routes/editprofile.route");
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
  socket.on('existingChats', (data) => {
    
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
