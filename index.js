const express = require('express');
const authRouter = require('./src/routes/auth.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(authRouter);

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("app is running on port 3000");
});