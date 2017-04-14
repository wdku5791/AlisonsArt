import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import BiddingRange from './BiddingRange.jsx';

const AuctionDetail = ({ auction }) => {
  return (
    <Container>
      <Container className="ui medium images">
        <Image className="ui image" src={auction.artwork.image_url} />
      </Container>
      <Container>
        <p>Description: {auction.artwork.description}</p>
        <p>Year: {auction.artwork.age}</p>
        <p>Estimated value ($USD): {auction.buyout_price}</p>
        <BiddingRange current={auction.current_bid_id} start={auction.start_price} end={auction.buyout_price} />
        <button onClick={() => { this.handleClick(this.props.user, this.props.history) }}>Submit</button>
      </Container>
    </Container>
  );
};