const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const GetProfileRouter = require("./src/routes/profile.routes");
const bodyParser = require("body-parser");
const homeRouter = require("./src/routes/home.routes");
const notification = require("./src/routes/notification.route");

// const { Server } = require("socket.io");
// const { createServer } = require("node:http");
// const { join } = require('node:path');
// const server = createServer(app);
// const io = new Server(server);
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// app.get('/index', (req, res) => {
//   res.sendFile(join(__dirname, '/public/index.html'));
// });

const authRouter = require("./src/routes/auth.routes");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

// app.use(authRouter);
app.use(homeRouter);
app.use(authRouter);
app.use(GetProfileRouter);
app.use(notification);
app.set("view engine", "ejs");

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
