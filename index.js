const express = require('express');
const body_parser = require('body-parser');


const authRouter = require('./src/routes/auth.routes');
const registration = require('./src/routes/registration');

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(body_parser.urlencoded({extended : true}));


app.use(express.static("public"));

app.use(authRouter);
app.use(registration);

app.set('view engine', 'ejs');

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}` );
});