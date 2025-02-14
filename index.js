const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/routes");

const connection = require("./config/connection");
const passport = require("passport");
require("./src/middleware/passport");

const PORT = process.env.PORT || 3000;
// const router = require("./src/routes/routes.js");
const logger = require("./logger/logger");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.static("node_modules/sweetalert2/dist"));
// app.use("/admin", adminroute);

app.use(routes);



app.get('*', (req, res) => {
  res.render('pages/404.ejs');
})

app.set("view engine", "ejs");


let connectedUser = {};

//Whenever someone connects this gets executed
io.on("connection", async function (socket) {

  // store userId and socketId when user connects
  socket.on("user-connected", async (userId) => {
    connectedUser[userId] = socket.id;
  });
  socket.on("mesaage", (msg) => {

    socket.broadcast.emit(`recivemsg`, msg)

  });

  socket.on("adminmesaage", (msg) => {

    socket.broadcast.emit(`adminrecive`, msg)

  });

  // to get all unread message count follower wise
  socket.on("getUnreadMessages", async (userId) => {
    try {
      if (connectedUser[userId]) {
        let sql = `select sender_id, count(id) as count from direct_messages where receiver_id = ? and is_read = 0 group by sender_id;`;

        let data = await connection.query(sql, [userId]);

        io.to(connectedUser[userId]).emit("unreadMessages", data[0]);
      }
    } catch (error) {
      logger.error(error);
    }
  });

  // to update the read flag of some specific follower
  socket.on("messageRead", async (data) => {
    try {
      let sql = `update direct_messages set direct_messages.is_read = 1 where direct_messages.sender_id = ? and direct_messages.receiver_id = ?;`;

      await connection.query(sql, [data.reciverId, data.senderId]);
    } catch (error) {
      logger.error(error);
    }
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {

    for (const userId in connectedUser) {
      if (connectedUser[userId] === socket.id) {
        delete connectedUser[userId];
        break;
      }
    }
  });

  socket.on("send-private-message", async (data) => {
    const { senderId, reciverId, content, url, content_type, created_at } = data;

    if (connectedUser[reciverId]) {
      io.to(connectedUser[reciverId]).emit("receive-private-message", {
        senderId,
        reciverId,
        content,
        url,
        content_type,
        created_at
      });
    }
  });




  // load old chats
  socket.on("existingChats", async (data) => {
    try {
      let sql = `select direct_messages.id, direct_messages.sender_id, direct_messages.receiver_id, direct_messages.content_type, direct_messages.content, direct_messages.is_read, direct_messages.created_at, message_medias.url from direct_messages left join message_medias on direct_messages.id = message_medias.message_id where (sender_id = '${data.senderId}' and receiver_id = '${data.reciverId}') or (sender_id = '${data.reciverId}' and receiver_id = '${data.senderId}') order by created_at;`;

      let [oldchats] = await connection.query(sql);

      socket.emit("loadChats", { oldchats: oldchats });
    } catch (error) {
      logger.error(error);
    }
  });
});

server.listen(PORT, () => {

});
