const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/auth.routes');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static("public"));

app.use(authRouter);

app.set('view engine', 'ejs');

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}` );
});