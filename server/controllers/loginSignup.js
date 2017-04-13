const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.post('/login', (req, res) => {
  console.log('req body: ', req.body);
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
        console.log('password matches!');
        res.status(201).send('login success!');
      } else {
        console.log('nope!');
        throw Error('Wrong password');
      }
    }
  })
  .catch(err => {
    console.log('error out');
    res.status(400).send('Log in error: ' + err);
  });
});

module.exports = router;

