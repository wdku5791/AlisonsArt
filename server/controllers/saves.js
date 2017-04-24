const router = require('express').Router();
const model = require('../database/queries');
const jwt = require('jsonwebtoken');

//get user -> auction saves relationship:

router.get('/', (req, res) => {
  let { q } = req.query;
  model.getSaveOrNot(req.query.q.split(' ')[0], req.query.q.split(' ')[1])
  .then(data => {
    if (data && Object.keys(data).length > 0){
      res.status(200).send('success');
    } else {
      res.status(200).send('failure');
    }
  })
  .catch(err => {
    res.status(400).send('Get saves error');
  });
});

router.get('/:userId', (req, res) => {
  model.getUserSavedAuctions(req.params.userId)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.post('/save', (req, res) => {
 
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to save');
    }

    model.saveAuction(decoded.userId, req.body)
    .then((data) => {
      res.status(201).send('succeed to save');
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });
});

router.post('/unsave', (req, res) => {
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to unsave');
    }

    model.unsaveAuction(decoded.userId, req.body)
    .then((data) => {
      res.status(201).send('succeed to unsave');
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });
});

module.exports = router;
