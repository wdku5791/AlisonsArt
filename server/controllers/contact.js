const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('recovered user info');
});

module.exports = router;