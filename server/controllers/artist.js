const router = require('express').Router();
const model = require('../database/queries');

const serverErr = { ERR: { status: 500, message: 'Something went wrong. So Sorry!' } };

router.get('/:artistId', (req, res) => {
  console.log('req.params: :: ', req.params);
  
  res.status(200).send('got artist\' stuff');
});

module.exports = router;
