const router = require('express').Router();
const model = require('../database/queries');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
 
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to save');
    }
    console.log('im decoded: ', decoded);
    console.log('request body: ', req.body);
    
    model.saveArtwork(decoded.userId, req.body);
    res.status(201).send('succ');

  });
});

module.exports = router;