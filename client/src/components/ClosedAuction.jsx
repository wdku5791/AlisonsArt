import React from 'react';
import { Container, Image, Grid } from 'semantic-ui-react';

const ClosedAuction = ({ auction }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Image fluid src={auction.artwork.image_url} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Container>
          <h2 className='closedListing'>This auction has closed</h2>
          <h2>{auction.artwork.art_name}</h2>
          <h3>{auction.first_name} {auction.last_name} ({auction.artwork.age})</h3>
          <p><strong>Description:</strong> {auction.artwork.description}</p>
          <p><strong>Closing Price (USD):</strong> ${auction.current_bid}</p>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default ClosedAuction;