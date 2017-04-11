import React, { Component } from 'react';
import Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';


class Auction extends Component {

  componentWillMount() {
    //fetch data here
    //dispatch fetch data by Id
    //id of this auction is saved at: this.props.match.params.auctionId
    // dispatch(Auctions.fetchingAnAuction(true));
    // fetch('/withId')
    // .then(response => {

    // })
  }
  // add button onClick={}
  render(){
  console.log('id: ', this.props.match.params.auctionId);
  let auction = this.props.auction.auction;
  // console.log('auction: ', this.props.auction.auction);
  //need to get the buyout price of this piece and the current bidding price of the piece, then generate values for the dropbox.
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