const router = require('express').Router();
const model = require('../database/queries');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.get('/:artistId', (req, res) => {
  let { artistId } = req.params;
  const queries = [model.getArtworksOfArtist(artistId), model.getAuctionsOfArtist(artistId), model.getArtistProfile(artistId)];
  Promise.all(queries)
  .then(fulfilled => {
    const data = {};
    data.artworks = fulfilled[0];
    data.auctions = fulfilled[1];
    data.profile = fulfilled[2];
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(400).send('Get artist info error!');
  });

});

module.exports = router;
