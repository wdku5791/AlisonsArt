import React from 'react';
import { Container, Image, Grid, Button, Form } from 'semantic-ui-react';
import BiddingRange from './BiddingRange.jsx';

const AuctionDetail = ({ auction, setBid, handleClick }) => {
  console.log('auction: ', auction);
  return (
    <Grid>
      <Grid.Column width={12}>
        <Image fluid src={auction.artwork.image_url} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Container>
          <h2>{auction.artwork.art_name}</h2>
          <h3>{auction.first_name} {auction.last_name} ({auction.artwork.age})</h3>
          <p><strong>Description:</strong> {auction.artwork.description}</p>
          <p><strong>Estimated Value (USD):</strong> ${auction.buyout_price}</p>
          <Form.Group widths='equal'>
            <BiddingRange setBid={setBid} current={auction.current_bid} start={auction.start_price} end={auction.buyout_price} />
            <Button onClick={handleClick}>Submit</Button>
          </Form.Group>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default AuctionDetail;