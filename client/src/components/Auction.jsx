import React, { Component } from 'react';
import Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';


class Auction extends Component {

  
  //when user clicks submit, check if user is logged in
    //if not re-direct
    //if logged in, grab all info and redirect to payment page.

  render(){
  console.log('id: ', this.props.match.params.auctionId);
  let auction = this.props.auction.auction;
  //need to get the buyout price of this piece and the current bidding price of the piece, then generate values for the dropbox.

  //submit button onClick will grab the dropbox value, userId and auctionId, direct to payment page.
    return (
      <div>
       hellolooloo
        <img src={auction.image_url} />
        <p>description floating right of the image</p>
        <select name="Bid now">
          <option defaultValue="Bid now">Bid now</option>
          <option>10000</option>
        </select>
        <button>Submit</button>
      </div>
    )
  }
}
//connect to the store to get the artwork to render:
const mapStateToProps = (state) => {
  return {
    auction: state.auction
  }
}
export default connect(mapStateToProps)(Auction);