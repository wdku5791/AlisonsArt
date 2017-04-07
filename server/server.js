const path = require('path');
// const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));


app.listen(port, function() {
  console.log('Listening on port ', port);
});
