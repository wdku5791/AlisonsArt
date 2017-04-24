const router = require('express').Router();
const model = require('../database/queries');
const request = require('request');
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);
const authenticate = require('../middlewares/authenticate');

router.get('/connect', (req, res) => {
  let connectURL = 'https://connect.stripe.com/oauth/authorize';

  const qs = {
    response_type: 'code',
    client_id: process.env.STRIPE_CLIENT_ID,
    scope: 'read_write'
  };

  let firstQ = true;

  for (var query in qs) {
    connectURL += firstQ ? `?${query}=${qs[query]}` : `&${query}=${qs[query]}`;
    firstQ = false;
  }

  res.redirect(connectURL);
});

router.get('/connect/callback', authenticate, (req, res) => {
  const { code, error } = req.query;

  request.post('https://connect.stripe.com/oauth/token',
    { form: {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID,
      code: code,
      client_secret: process.env.STRIPE_CLIENT_SECRET
    } },
    (error, response, body) => {
      if (error) {
        res.send(error);
      }
      model.updateStripe(JSON.parse(body), req.user.userId)
      .then((stripeId) => {
        return model.updateUserType('artist', req.user.userId);
      })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.status(404).send('Stripe Error - account not connected');
      });
    });
});

router.post('/charge', authenticate, (req, res) => {
  const { token, auction } = req.body;

  model.getStripeId(auction.owner_id)
  .then((result) => {
    console.log(result.stripe_user_id);
    stripe.charges.create({
      amount: auction.current_bid,
      currency: 'usd',
      source: token.id
    }, {
      stripe_account: result.stripe_user_id
    }).then((charge) => {
      // asynchronously called
      return model.updatePaymentStatus('paid', auction.id)
    })
    .then(() => {
      res.status(200).json({status: 200, message: 'Payment made succesfully'});
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  })
  .catch((err) => {
    res.status(404).send(err);
  });
});

module.exports = router;
