import React, { Component } from 'react';
import Auctions from '../actions/auctionActionCreator.jsx';

class Auction extends Component {

  componentWillMount() {
    //fetch data here
    //dispatch fetch data by Id
    //id of this auction is saved at: this.props.match.params.auctionId
    dispatch(Auctions.fetchingAnAuction(true));
    // fetch('/withId')
    // .then(response => {

    // })
  }
  // add button onClick={}
  render(){
  console.log(this.props.match.params.auctionId);
    return (
      <div>
       hellolooloo
        <img/>
        <p>description floating right of the image</p>
        <button >Bid now</button>
      </div>
    )
  }
}

export default Auction;