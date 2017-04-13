import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';

let bidValue = 0;
let BiddingRange = ({current, start, end}) => {
  const interval = 1000;
  current = +current;
  start = +start;
  end = +end;

  start = start < current ? current : start;

  let range = [];
  
  for(let i = start; i <= end; i += interval) {
    range.push(i);
  }
  return (
    <select name="Bid now" onChange={(e) => {bidValue = +e.target.value}}>
      <option defaultValue="Bid now">Bid now</option>
      {range.map(r => <option key={r}>{r}</option>)}
    </select>
  )
}

class Auction extends Component {

  //when user clicks submit, check if user is logged in
    //if not re-direct
    //if logged in, grab all info and redirect to payment page.
  componentWillMount() {
    let auctionId = this.props.match.params.auctionId;
    let {dispatch} = this.props;
    dispatch(Auctions.fetchingAnAuction(true));

    fetch('/auctions/' + auctionId)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
        dispatch(Auctions.fetchingAnAuction(false));
        return response.json();
    })
    .then(data => {
      console.log('fetch an auction data: ', data[0]);
      dispatch(Auctions.fetchedAnAuction(data[0]));
    })
    .catch((err) => dispatch(Auctions.fetchAuctionErrored(true, err)));
  }

  handleClick(user, history) {
    if (bidValue === 0) {
      alert('Please select a value');
    } else {
      console.log('bid value is a number');
      console.log('useris: ', user);
      //if user not logged in, redirect
      if(!user.username) {
        alert('you are not logged in, please sign up or log in');
        history.push('/signup')
      } else {
      //grab userid, artwork_id and value

        // fetch('/url?????', {
        //   method: 'POST',
        //   body: ???stringified JSON
        // });
      }
    }
  }

  render(){

    let {auction} = this.props.auction;
    // console.log('key length: ', Object.keys(auction).length);
    if (Object.keys(auction).length === 0) {
      return (
        <p>loading~~~</p>
      )
    } else {
      return (
        //the current_bid in BiddingRange needs to be replaced by the highest bid_price from backend
        <Container>
          <Container className="ui medium images">
            <Image className="ui image" src={auction.artwork.image_url}/>
          </Container>
          <Container>
            <p>Description: {auction.artwork.description}</p>
            <p>Year: {auction.artwork.age}</p>
            <p>Estimated value ($USD): {auction.buyout_price}</p>
            <BiddingRange current={auction.current_bid} start={auction.start_price} end={auction.buyout_price}/>
            <button onClick={() => {this.handleClick(this.props.user, this.props.history)}}>Submit</button>
          </Container>
        </Container>
      )
    }
  }
}
//connect to the store to get the artwork to render:
const mapStateToProps = (state) => {
  return {
    auction: state.auction,
    user: state.user
  }
}
export default connect(mapStateToProps)(Auction);