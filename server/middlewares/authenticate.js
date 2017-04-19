const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config.js'); //holds jwtSecret

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if(token) {
    //validate
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Failed to authenticate.'
        });
      } else {
        //do something here
        next();
      }
    });
  } else {
    //response with error:
    res.status(403).json({
      error: 'No token provided'
    });
  }
};

module.exports = authenticate;