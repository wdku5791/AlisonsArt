import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import { connect } from 'react-redux';
import AuctionDetail from './AuctionDetail.jsx';
import ClosedAuction from './ClosedAuction.jsx';
import { setBid } from '../actions/bidActionCreator';
import Moment from 'moment';


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

  setBid(bid) {
    const { dispatch } = this.props;
    dispatch(setBid(bid));
  }

  handleClick() {
    if (bidValue === 0) {
      alert('Please select a value');
    } else {
      console.log('bid value is a number');
      console.log('useris: ', this.props.user);
      //if user not logged in, redirect
      if(!this.props.user.username) {
        alert('you are not logged in, please sign up or log in');
        this.props.history.push('/signup')
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
      const end = new Moment(auction.end_date);
      const now = new Moment();
      if (end.isBefore(now)) {
        return (
          <ClosedAuction auction={auction}/>
        );
      } else {
        return (
          <AuctionDetail handleClick={this.handleClick.bind(this)} auction={auction} setBid={this.setBid.bind(this)}/>
        );
      }
    }
  }
}
//connect to the store to get the artwork to render:
const mapStateToProps = (state) => {
  return {
    auction: state.auction,
    user: state.user,
    bid: state.bid,
  }
}
export default connect(mapStateToProps)(Auction);