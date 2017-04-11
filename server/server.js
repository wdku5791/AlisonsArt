const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const auctionHandler = require('./controllers/auctions');
// const db = require('./database/config.js');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/public')));

app.use('/auctions', auctionHandler);

const server = app.listen(port, function() {
  console.log('Listening on port ', port);
});

module.exports = server;
