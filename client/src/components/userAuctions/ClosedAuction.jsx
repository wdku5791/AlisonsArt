import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';

const ClosedAuction = ({auction}) => {
  const onToken = (token) => {
    console.log(token);
  };

  let message;
    if (auction.won) {
      message = <StripeCheckout
                token={onToken}
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