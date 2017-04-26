import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as UserActions from '../actions/userActionCreator.jsx';
import { connect } from 'react-redux';
import AuctionDetail from './AuctionDetail.jsx';
import ClosedAuction from './ClosedAuction.jsx';
import * as Bids from '../actions/bidActionCreator';
import Moment from 'moment';


class Auction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
    this.setBid = this.setBid.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const auctionId = this.props.match.params.auctionId;
    const { dispatch, user } = this.props;
    dispatch(Auctions.fetchingAnAuction(true));
    fetch(`/auctions/${auctionId}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
        dispatch(Auctions.fetchingAnAuction(false));
        return response.json();
    })
    .then(data => {
      dispatch(Auctions.fetchedAnAuction(data[0]));
    })
    .catch(err => {
      dispatch(Auctions.fetchingAnAuction(false));
      dispatch(Auctions.fetchAuctionErrored(true, err));
    });

    if (user.username) {
      fetch('/saves/?q=' + user.userId + '+' + auctionId)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      })
      .then(data => {
        if (data === 'success') {
          this.setState({flag: true});
        } else {
          this.setState({flag: false});
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
      this.setState({flag: true});
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
      this.setState({flag: false});
    })
    .catch(err => {
      alert('Something went wrong, can\'t unsave auction');
    });
  }

  setBid(bid) {
    const { dispatch } = this.props;
    dispatch(Bids.setBid(bid));
  }

  handleClick(auctionId, avail, buyout) {
    const { bid, user, history, dispatch } = this.props;
    //Alison's new: 
    //this is for invalid input:
    if(!user.username) {
      alert('You are not logged in, please sign up or log in');
      history.push('/login');
    } else {
      if (!bid.bid){
        alert('Please enter a valid value');
      } else if(bid.bid < avail) {
        alert('Please at least bid for the next available amount');
      } else if(bid.bid > buyout) {
        alert('Do you want to bid for the buyout amount?');
      } else {
        //can send the request here now~~~
        //send 
        fetch('/auctions/' + auctionId + '/bids', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
          }),
          body: JSON.stringify({
            bidPrice: bid.bid
          })
        })
        .then(response => {
          if (!response.ok) {
            throw Error(response.json());
          }
          return response.json();
        })
        .then(data => {
          bid.current_bid_id = user.userId;
          bid.current_bid = bid.bid;
          dispatch(Auctions.updateBid(bid));
          alert(`You have successfully bid $${bid.bid}`);
        })
        .catch(err => {
          dispatch(Bids.error(err));
        });
      }
    }

    //old: 
    //   //grab userid, artwork_id and value
    //     dispatch(Bids.toggleSend());
    //     fetch(`/auctions/${id}/bids`, {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
    //       }),
    //       body: JSON.stringify({ bidPrice: bid.bid })
    //     })
    //     .then((answer) => {
    //       if (!answer.ok) {
    //         throw Error(answer.json());
    //       } else {
    //         answer.json()
    //         .then((bid) => {
    //           dispatch(Auctions.updateBid(bid));
    //           alert(`you have successfully bid $${bid.current_bid}`);

    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       dispatch(Bids.error(err));
    //     });
    // }
  }

  render() {

    const { auction } = this.props.auction;
    const { bid, user } = this.props;
    if (Object.keys(auction).length === 0) {
      return (
        <p>loading~~~</p>
      );
    } else {
      const end = new Moment(auction.end_date);
      const now = new Moment();
      if (end.isBefore(now)) {
        return (
          <ClosedAuction flag={this.state.flag} user={user} auction={auction} handleSave={() => {this.handleSave(auction.id)}} handleUnsave={() => {
            this.handleUnsave(auction.id)
          }}/>
        );
      } else {
        return (
          <div>
            <AuctionDetail flag={this.state.flag} user={user} handleClick={this.handleClick} auction={auction} setBid={this.setBid} handleSave={() => {
              this.handleSave(auction.id)
            }} handleUnsave={() => {
              this.handleUnsave(auction.id)
            }}/> 
          </div>
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