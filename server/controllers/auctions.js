const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

router.get('/', (req, res) => {
  const limit = req.query.limit || 20;
  const status = req.query.status || '>';
  const time = new Moment().format('YYYY-MM-DD HH:mm:mm');

  model.getAuctions(limit, time, status)
  .then((auctions) => {
    res.status(200).json(auctions);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.post('/', (req, res) => {
  model.createArtwork(req.body.artwork)
  .then((data) => {
    req.body.artwork_id = data.id;
    model.createAuction(req.body)
    .then((auctionId) => {
      res.status(201).json(auctionId);
    });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
