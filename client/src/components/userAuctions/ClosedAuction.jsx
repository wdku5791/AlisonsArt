import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';

const ClosedAuction = ({auction}) => {
  const onToken = (token, auction) => {
    console.log(token);
    console.log(auction)
    const data = {};
    data.token = token;
    data.auction = auction;

    fetch('/stripe/charge', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
      }),
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          return response.text()
          .then(err => {
            return Error(err);
          });
        } else {
          throw Error();
        }
      } else {
        return response.json();
      }
    })
    .then(data => {
      alert(data.message);
    })
    .catch(err => {
      alert(err);
    });
  };

  let message;
    if (auction.won) {
      message = <StripeCheckout
                token={(token) => { onToken(token, auction); }}
                stripeKey="pk_test_OPzkCFtDFdvkqzZP2RCkuNDA"
                />;
    } else {
      message = <button>More by this Artist</button>;
    }
    return (
      <Container>
        <Container className="ui medium images">
          <Image className="ui image" src={auction.image_url} />
        </Container>
        <Container>
          <p>Description: {auction.description}</p>
          <p>Year: {auction.age}</p>
          <p>Closing Price ($USD): {auction.current_bid}</p>
          {message}
        </Container>
      </Container>
    );
};

export default ClosedAuction;