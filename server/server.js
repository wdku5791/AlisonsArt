const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/public')));


app.listen(port, function() {
  console.log('Listening on port ', port);
});
