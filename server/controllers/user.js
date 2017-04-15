const router = require('express').Router();
const model = require('../database/queries');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.get('/:userId', (req, res) => {
  console.log('params: ', req.params);
  model.getUser(req.params.userId)
  .then(response => {
    res.status(200).send(response[0]);
  })
  .catch(err => {
    console.log('errrrr: ', err);
    res.satus(400).send('Wrong password');
  });
});

router.post('/:userId/changePassword', (req, res) => {
  console.log('request body: ', req.body);
  model.changeUserPassword(req.body.userId, req.body.password)
  .then(response => {
    res.status(201).send('changed password');
  })
  .catch(err => {
    res.status(400).send('failed to change password');
  });
});

module.exports = router;