const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

router.post('/', (req, res) => {
  req.body.message_date = new Moment().format('YYYY-MM-DD HH:mm:ss')
  model.createMessage(req.body)
  .then((message) => {
    res.status(201).json(message);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  })
})

router.get('/:userId', (req, res) => {
  model.getUserMessages(req.params.userId, req.query.receiver_id)
  .then((messages) => {
    res.status(200).json(messages);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  })
})

router.get('/inbox/:userId', (req, res) => {
  model.getInboxMessages(req.params.userId)
  .then((messages) => {
    res.status(200).json(messages);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  })
})

module.exports = router;