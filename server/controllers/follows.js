const router = require('express').Router();
const model = require('../database/queries');
const jwt = require('jsonwebtoken');

router.get('/:userId', (req, res) => {
  model.getUserFollows(req.params.userId)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.post('/', (req, res) => {
 
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to save');
    }
    let followerObj = {};
    followerObj.follower_id = decoded.userId;
    followerObj.followee_id = req.body;
    //check if there are any user follow info.
    //if yes unfollow
    //if no follow
    model.createFollower(followerObj)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });
});

module.exports = router;
