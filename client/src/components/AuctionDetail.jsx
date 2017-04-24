import React from 'react';
import { Container, Image, Grid, Button, Form } from 'semantic-ui-react';
import Moment from 'moment';
import BiddingRange from './BiddingRange.jsx';

const AuctionDetail = ({ auction, setBid, handleClick, handleSave, user }) => {
  let endTime = new Moment(auction.end_date).format('MMMM Do, YYYY, h:mm:ss a');
  return (
    <Grid>
      <Grid.Column width={11}>
        <Image fluid src={auction.artwork.image_url} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Container>
          <h2>{auction.artwork.art_name}</h2>
          {user ? <Button circular icon="heart" content="save" onClick={() =>{
            handleSave(auction.id)
          }}/ > : null}
          <Button circular icon="empty heart" content="unsave" color="green"/>
          <h3>{auction.first_name} {auction.last_name} ({auction.artwork.age})</h3>
          <p><strong>Auction Ends:</strong> {endTime}</p>
          <p><strong>Description:</strong> {auction.artwork.description}</p>
          <p><strong>Current Price (USD):</strong> ${auction.current_bid || auction.start_price}</p>
          <p><strong>Buyout Price (USD):</strong> ${auction.buyout_price}</p>
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