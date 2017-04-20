const router = require('express').Router();
const model = require('../database/queries');

router.get('/:artistId', (req, res) => {
  let { artistId } = req.params;
  const queries = [model.getArtworksOfArtist(artistId), model.getAuctionsOfArtist(artistId), model.getArtistProfile(artistId)];
  Promise.all(queries)
  .then(fulfilled => {
    const data = {};
    data.artworks = fulfilled[0];
    let timeNow = new Date().getTime();
    data.passedAuctions = fulfilled[1].filter(auction => auction.end_date.getTime() < timeNow);
    data.ongoingAuctions = fulfilled[1].filter(auction => auction.end_date.getTime() >= timeNow);
    data.profile = fulfilled[2];
    
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(400).send('Get artist info error!');
  });

});

module.exports = router;
