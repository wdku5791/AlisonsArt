const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

router.post('/', (req, res) => {
  req.body.message_date = new Moment().format('YYYY-MM-DD HH:mm:ss')
  console.log('req.body: ', req.body);
  model.createMessage(req.body)
  .then((message) => {
    res.status(200).json(message);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  })
})



module.exports = router;