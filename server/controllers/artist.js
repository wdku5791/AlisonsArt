const router = require('express').Router();
const model = require('../database/queries');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.get('/:artistId', (req, res) => {
  let { artistId } = req.params;
  console.log('req.params: :: ', req.params);
  const queries = [model.getArtworksOfArtist(artistId), model.getAuctionsOfArtist(artistId), model.getArtistProfile(artistId)];
  Promise.all(queries)
  .then(fulfilled => {
    console.log(fulfilled);
    res.status(200).send('ha');
  })
  .catch(err => {
    console.log('error out', err);
    res.status(400).send('uh oh');
  });

});

module.exports = router;
