const router = require('express').Router();
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const model = require('../database/queries');

const recoverUserInfo = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  let authToken;
  if (authorizationHeader) {
    authToken = authorizationHeader.split(' ')[1];
  } else {
    authToken = req.cookies.jwt;
  }

  if (authToken !== 'null') {
    jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        // if failed to authenticate, front end should delete the token
        res.status(403).json({
          error: 'Failed to authenticate.'
        });
        next();
      } else {
        // attach decoded user info to res.headers:
        const decodedInfo = decode(authToken);
        model.getUser(decodedInfo.userId)
        .then((result) => {
          const user = result[0];
          let authToken = jwt.sign({
            username: user.username,
            userId: user.id,
            type: user.type,
            isAuthenticated: true,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          }, process.env.jwtSecret);
          res.cookie('jwt', authToken);
          res.setHeader('x-username', user.username);
          res.setHeader('x-userId', user.id);
          res.setHeader('x-userEmail', user.email);
          res.setHeader('x-type', user.type);
          res.status(200).send('authenticated');
        });
      }
    });
  } else {
    // there's no auth token provided in the request headers
    res.status(200).send('no authentication token');
  }
};

module.exports = recoverUserInfo;
