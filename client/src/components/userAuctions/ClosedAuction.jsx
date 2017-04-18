import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';

const ClosedAuction = ({auction}) => {
  let message;
    if (auction.won) {
      message = <button>Send Payment</button>;
    } else {
      message = <button>More by this Artist</button>;
    }
    return (
      <div className="user_auctions">
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
      </div>
    );
};

export default ClosedAuction;