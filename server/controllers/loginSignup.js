const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config.js'); //holds jwtSecret

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  //check if user exists
  model.getUserByName(username)
  .then(response => {
    //user does NOT exist
    if(response.length === 0) {
      throw Error('user does not exist!');
    } else {
    //check if password matches the ones in database, consider HASH
      if (response[0].password === password) {
        //succeed! we can assign a token here!
        console.log('do we have user: ', req.user);
        let token = jwt.sign({
          username: username,
          userId: response[0].id,
          isAuthenticated: true,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        }, config.jwtSecret);

        res.status(201).send(JSON.stringify({
          username: username,
           userId: response[0].id
        }));
      } else {
        throw Error('Wrong password');
      }
    }
  })
  .catch(err => {
    res.status(400).send('Wrong username or password!');
  });
});

router.post('/signup', (req, res) => {
  let { username, password, firstName, lastName, email, address } = req.body;
  //check if user exists 
  Promise.all([model.getUserByName(username), model.getUserByEmail(email)])
  .then(response => {
    //username taken or email taken.
    if(response.length === 1) {
      throw Error('username or email already exists!');
    } else {
      // const query = {
      //   password: password
      //   username: username
      //   first_name: firstName
      //   last_name: lastName
      //   address:
      //   email:
      //   type:
      // };
      return model.createUser(req.body);
    }
  })
  .then((result) => {
    res.status(201).send(JSON.stringify({
      username: username,
       userId: result[0].id
    }));
  })
  .catch(err => {
    console.log(err.code);
    if (err.code === '23505') {
      const message = 'username or email already exists';
      res.status(400).send(message);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post('/signup', (req, res) => {
  let { username, password, firstName, lastName, email, address } = req.body;
  //check if user exists 
  Promise.all([model.getUserByName(username), model.getUserByEmail(email)])
  .then(response => {
    //username taken or email taken.
    if(response.length === 1) {
      throw Error('username or email already exists!');
    } else {
      // const query = {
      //   password: password
      //   username: username
      //   first_name: firstName
      //   last_name: lastName
      //   address:
      //   email:
      //   type:
      // };
      return model.createUser(req.body);
    }
  })
  .then((result) => {
    res.status(201).send(JSON.stringify({
      username: username,
       userId: result[0].id
    }));
  })
  .catch(err => {
    res.status(400).send('sign-in error: ' + err);
  });
});

module.exports = router;

