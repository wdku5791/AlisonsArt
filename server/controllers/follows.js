const router = require('express').Router();
const model = require('../database/queries');
const jwt = require('jsonwebtoken');

//get user -> artist following relationship:
router.get('/', (req, res) => {
  let { q } = req.query;
  model.getFollowOrNot(q.split(' ')[0], q.split(' ')[1])
  .then(data => {
    if(data && Object.keys(data).length > 0){
      res.status(200).send('true');
    } else {
      res.status(200).send('false');
    }
  })
  .catch(err => {
    res.status(400).send('Get follows error');
  });
});

router.get('/:userId', (req, res) => {
  model.getUserFollows(req.params.userId)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.post('/follow', (req, res) => {
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to follow');
    }
    let followerObj = {};
    followerObj.follower_id = decoded.userId;
    followerObj.followee_id = req.body;
    
    model.createFollower(followerObj)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });
});

router.post('/unfollow', (req, res) => {
  let authToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(authToken, process.env.jwtSecret, (err, decoded) => {
    if(err) {
      res.status(400).send('failed to unfollow');
    }

    model.deleteFollower(decoded.userId, req.body)
    .then(() => {
      res.status(201).send('success');
    })
    .catch(err => {
      res.status(400).send(err);
    });
  });
});

module.exports = router;
