const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('you found the auctions path');
});

module.exports = router;
