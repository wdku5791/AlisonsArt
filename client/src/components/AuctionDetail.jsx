import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import BiddingRange from './BiddingRange.jsx';

const AuctionDetail = ({ auction, setBid, handleClick }) => {
  return (
    <Container>
      <Container className="ui medium images">
        <Image className="ui image" src={auction.artwork.image_url} />
      </Container>
      <Container>
        <p>Description: {auction.artwork.description}</p>
        <p>Year: {auction.artwork.age}</p>
        <p>Estimated value ($USD): {auction.buyout_price}</p>
        <BiddingRange setBid={setBid} current={auction.current_bid} start={auction.start_price} end={auction.buyout_price} />
        <button onClick={handleClick}>Submit</button>
      </Container>
    </Container>
  );
};

export default AuctionDetail;