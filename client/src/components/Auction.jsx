import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';


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

  render(){
  //need to get the buyout price of this piece and the current bidding price of the piece, then generate values for the dropbox.

  //submit button onClick will grab the dropbox value, userId and auctionId, direct to payment page.
    // <img src={auction.image_url} />
    console.log('after fetch complete: ', this.props.auction);
    let {auction} = this.props.auction;
    console.log('auction: ', auction);
    console.log('key length: ', Object.keys(auction).length);
    if (Object.keys(auction).length === 0) {
      return (
        <p>loading~~~</p>
      )
    } else {
      return (
        //loading:
        <Container>
          <Container className="ui medium images">
            <Image className="ui image" src={auction.artwork.image_url}/>
          </Container>
          <Container>
            <p>Description: {auction.artwork.description}</p>
            <p>Year: {auction.artwork.age}</p>
            <p>Estimated value ($USD): {auction.buyout_price}</p>
            <select name="Bid now">
              <option defaultValue="Bid now">Bid now</option>
              <option>10000</option>
            </select>
            <button>Submit</button>
          </Container>
        </Container>
      )
    }
  }
}
//connect to the store to get the artwork to render:
const mapStateToProps = (state) => {
  return {
    auction: state.auction
  }
}
export default connect(mapStateToProps)(Auction);