const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config.js'); //holds jwtSecret

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let authToken;
  if (authorizationHeader) {
    authToken = authorizationHeader.split(' ')[1];
  }

  if(authToken) {
    //validate
    jwt.verify(authToken, config.jwtSecret, (err, decoded) => {
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
      error: 'No jwt token provided'
    });
  }
};

module.exports = authenticate;