const router = require('express').Router();
const model = require('../database/queries');

router.get('/:userId', (req, res) => {
  model.getUserNotifications(req.params.userId)
  .then((notifications) => {
    res.status(200).json(notifications);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  });
});

router.post('/:userId', (req, res) => {
  const query = {
    owner_id: req.params.userId,
    id: req.body.id
  }
  model.updateUserNotification(query)
  .then(() => {
    res.status(201).json();
  })
  .catch((serverErr) => {
    console.log('serverErr', serverErr)
    res.status(500).send(serverErr);
  });
});

module.exports = router;
