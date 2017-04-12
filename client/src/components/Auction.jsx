import React, { Component } from 'react';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';


class Auction extends Component {

  
  //when user clicks submit, check if user is logged in
    //if not re-direct
    //if logged in, grab all info and redirect to payment page.

  fetchAuction(auctionId, dispatch) {
    //dispatch action and connect to store
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
      console.log('fetch an auction data: ', data);

    })
    .catch((err) => dispatch(Auctions.fetchAuctionErrored(true, err)))

    // fetch('/home')
    //   .then(response => {
    //     if(!response.ok) {
    //       throw Error(response.statusText);
    //     }
    //     dispatch(Auctions.fetchingAuctions(false));
    //     console.log('hererererere');
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('im data: ', data);
    //     let {current, expired, featuredArt} = data;
    //     dispatch(Auctions.passedAuctionsFetchedSuccess(expired));
    //     dispatch(Auctions.ongoingAuctionsFetchedSuccess(current));
    //     dispatch(Auctions.featuredArtsFetchedSuccess(featuredArt));
    //   })
    //   .catch(() => dispatch(Auctions.fetchAuctionErrored(true)));

  }

  render(){
  console.log('id: ', this.props.match.params.auctionId);
  let currentAuction = this.fetchAuction(this.props.match.params.auctionId, this.props.dispatch);
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