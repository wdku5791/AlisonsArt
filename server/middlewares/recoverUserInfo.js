const router = require('express').Router();
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const model = require('../database/queries');

const recoverUserInfo = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  let authToken;
  if (authorizationHeader) {
    authToken = authorizationHeader.split(' ')[1];
  }

  if(authToken !== 'null') {
    jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        //if failed to authenticate, front end should delete the token
        res.status(403).json({
          error: 'Failed to authenticate.'
        });
      } else {
        //attach decoded user info to res.body:
        let decodedInfo = decode(authToken);
        res.body = decodedInfo;
        next();
      }
    });
  } else {
    //there's no auth token provided in the request headers
    next();
  }
};

module.exports = recoverUserInfo;