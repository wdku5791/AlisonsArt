const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.get('/', (req, res) => {
  const limit = req.query.limit || 20;
  const status = req.query.status || '>';
  const time = new Moment().format('YYYY-MM-DD HH:mm:mm');

  model.getAuctions(limit, time, status)
  .then((auctions) => {
    res.status(200).json(auctions);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(serverErr);
  });
});

router.post('/', (req, res) => {
  console.log('posting artwork & auction to /auction/');
  console.log(req.body);
  model.createArtwork(req.body.artwork)
  .then((data) => {
    req.body.artwork_id = data.id;
    model.createAuction(req.body)
    .then((auctionId) => {
      res.status(201).json(auctionId);
    });
  })
  .catch((serverErr) => {
    console.log(serverErr);
    res.status(500).send(serverErr);
  });
});

router.get('/:auctionId', (req, res) => {
  model.getAuction(req.params.auctionId)
  .then((auctions) => {
    if (auctions.length === 0) {
      res.status(404).json({ ERR: { Status: 404, message: 'this auction does not exist' } });
    }
    res.status(200).json(auctions);
  })
  .catch(() => {
    res.status(500).send(serverErr);
  });
});

router.get('/:auctionId/bids', (req, res) => {
  model.getAuctionBids(req.params.auctionId)
  .then((bids) => {
    res.status(200).json(bids);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(serverErr);
  });
});

router.post('/:auctionId/bids', (req, res) => {
  const bid = {};
  bid.auction_id = req.params.auctionId;
  bid.bidder_id = req.user || 1;
  bid.bid_price = req.body.bidPrice;
  bid.bid_date = new Moment().format('YYYY-MM-DD HH:mm:mm');

  model.createBid(bid)
  .then((bid) => {
    console.log(bid);
    const update = {};
    update.auction_id = req.params.auctionId;
    update.bid = bid;

    model.updateAuction(update)
    .then((bid) => {
      console.log(bid);
      res.status(201).json({ response: { status: 201, id: bid } });
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(serverErr);
  });
});

router.get('/:auctionId', (req, res) => {
  model.getAuction(req.params.auctionId)
  .then((auctions) => {
    if (auctions.length === 0) {
      res.status(404).json({ ERR: { Status: 404, message: 'this auction does not exist' } });
    }
    res.status(200).json(auctions);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;