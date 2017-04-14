const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const auctionHandler = require('./controllers/auctions');
const homeHandler = require('./controllers/home');
const loginSignupHandler = require('./controllers/loginSignup');
const userHandler = require('./controllers/user');

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/public')));

app.use('/auctions', auctionHandler);
app.use('/home', homeHandler);
app.use('/auth', loginSignupHandler);
app.use('/user', userHandler);

const server = app.listen(port, function() {
  console.log('Listening on port ', port);
});

module.exports = server;
