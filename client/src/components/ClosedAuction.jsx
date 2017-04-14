import React from 'react';
import { Container, Image } from 'semantic-ui-react';

const ClosedAuction = ({ auction }) => {
  return (
    <Container>
      <Container className="ui medium images">
        <Image className="ui image" src={auction.artwork.image_url} />
      </Container>
      <Container>
        <p>Description: {auction.artwork.description}</p>
        <p>Year: {auction.artwork.age}</p>
        <p>Closing Price ($USD): {auction.current_bid}</p>
      </Container>
    </Container>
  );
};

export default ClosedAuction;