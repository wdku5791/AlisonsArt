import React, { Component } from 'react';
import { Container, Image, Grid, Button, Form } from 'semantic-ui-react';
import Moment from 'moment';
import BiddingRange from './BiddingRange.jsx';

class AuctionDetail extends Component{
  constructor(props) {
    super(props);
    this.state={
      active: false
    };
  }

  componentWillMount() {
    if (this.props.user.username) {
      fetch('/saves/?q=' + this.props.user.userId + '+' + this.props.auction.id)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      })
      .then(data => {
        if (data === 'success') {
          this.setState({active: true});
        } else {
          this.setState({active: false});
        }
      })
      .catch(err => {
        console.log(err.message);
      });
    }
  }

  handleSave(auction_id) {
    fetch('/saves/save', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      }),
      body: JSON.stringify(auction_id)
    })
    .then(response => {
      if(!response.ok) {
        throw Error('failed to save!');
      }
      return true;
    })
    .then(data => {
      this.setState({active: true});
    })
    .catch(err => {
      alert('Something went wrong, can\'t save auction');
    });
  }

  handleUnsave(auction_id) {
    fetch('/saves/unsave', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      }),
      body: JSON.stringify(auction_id)
    })
    .then(response => {
      if(!response.ok) {
        throw Error('failed to unsave!');
      }
      return true;
    })
    .then(data => {
      this.setState({active: false});
    })
    .catch(err => {
      alert('Something went wrong, can\'t unsave auction');
    });
  }

  render(){
    let { auction, setBid, handleClick, user } = this.props;
    let endTime = new Moment(auction.end_date).format('MMMM Do, YYYY, h:mm:ss a');
    return (
      <Grid>
        <Grid.Column width={11}>
          <Image fluid src={auction.artwork.image_url} />
        </Grid.Column>
        <Grid.Column width={5}>
          <Container>
            <h2>{auction.artwork.art_name}</h2>
            {user && !this.state.active ? <Button circular icon="heart" content="save" color="green" onClick={() =>{
              this.handleSave(auction.id)
            }} /> : null}
            {user && this.state.active ? <Button circular icon="empty heart" content="unsave" onClick={() => {
              this.handleUnsave(auction.id)
            }} /> : null}
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
  }
};

export default AuctionDetail;
