const router = require('express').Router();
const model = require('../database/queries');
const Moment = require('moment');

const time = new Moment().format('YYYY-MM-DD HH:mm:ss');

router.get('/', (req, res) => {
  const queries = [model.getAuctions(3, time, '>'), model.getAuctions(3, time, '<'), model.featuredArt()];
  Promise.all(queries)
  .then((fufilled) => {
    console.log('ahhh')
    const data = {};
    console.log('1')
    data.current = fufilled[0];
    console.log('2')
    data.expired = fufilled[1];
    console.log('3')
    data.featuredArt = fufilled[2];
    console.log('here');
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log('ohohoh')
    res.status(500).send(err);
  });
});

module.exports = router;
