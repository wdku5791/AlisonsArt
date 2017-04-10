const router = require('express').Router();
const model = require('../database/queries');

router.get('/', (req, res) => {
  res.status(200).send('you found the auctions path');
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
