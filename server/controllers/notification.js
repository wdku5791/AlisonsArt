const router = require('express').Router();
const model = require('../database/queries');

router.get('/:userId', (req, res) => {
  console.log(req.params, 'req params');
  model.getUserNotifications(req.params.userId) // DB QUERY
  .then((notifications) => {
    console.log(notifications, 'notifications');
    res.status(200).json(notifications);
  })
  .catch((serverErr) => {
    res.status(500).send(serverErr);
  });
});

module.exports = router;