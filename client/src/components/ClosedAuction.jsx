import React, { Component } from 'react';
import { Container, Image, Grid, Button } from 'semantic-ui-react';
import Moment from 'moment';

class ClosedAuction extends Component {
// = ({ auction, handleSave, handleUnsave, user }) => {
  constructor(props) {
    super(props);
    this.state ={
      active: false
    };
  }
  render() {
    let { auction, handleSave, handleUnsave, user } = this.props;
    let endTime = new Moment(auction.end_date).format('MMMM Do, YYYY, h:mm:ss a');
    let context = this;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Image fluid src={auction.artwork.image_url} />
        </Grid.Column>
        <Grid.Column width={4}>
          <Container>
            <h2 className='closedListing'>This auction ended: {endTime}</h2>
            {user.username ? <Button circular icon="heart" content="save" color="green" onClick={() =>{
              handleSave.bind(context).call(null, auction.id)
            }}/ > : null}
            <h2>{auction.artwork.art_name}</h2>
            <h3>{auction.first_name} {auction.last_name} ({auction.artwork.age})</h3>
            <p><strong>Description:</strong> {auction.artwork.description}</p>
            <p><strong>Closing Price (USD):</strong> ${auction.current_bid}</p>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
};

export default ClosedAuction;
