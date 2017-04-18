import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import * as userAuctions from '../actions/userAuctionsActionCreator';
import AuctionDetail from './AuctionDetail.jsx';
import ClosedAuction from './ClosedAuction.jsx';
import { connect } from 'react-redux';

class UserAuctions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, user, } = this.props;

    dispatch(userAuctions.fetchingUserAuctions(true));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch('/auctions/ongoing', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({user: user.userId})
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
        dispatch(userAuctions.fetchingUserAuctions(false));
        return response.json();
    })
    .then(data => {
      console.log(data);
      dispatch(userAuctions.userAuctionsFetched(data));
    })
    .catch((err) => dispatch(userAuctions.userAuctionsErrored(err)));
  }

  render() {
    const { openAuctions, closedAuctions, isFetching } = this.props.userAuctions;
    const auction = closedAuctions[0];

    if (isFetching) {
      return (
        <div>Loading~~~~~</div>
      );
    }

    if (auction) {
      let message;
      if (auction.won) {
        message = <button>Send Payment</button>;
      } else {
        message = <button>More by this Artist</button>;
      }
      return (
        <Container>
          <Container className="ui medium images">
            <Image className="ui image" src={auction.image_url} />
          </Container>
          <Container>
            <p>Description: {auction.description}</p>
            <p>Year: {auction.age}</p>
            <p>Closing Price ($USD): {auction.current_bid}</p>
            {message}
          </Container>
        </Container>
      );
    }

    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAuctions: state.userAuctions,
    user: state.user
  };
};

export default connect(mapStateToProps)(UserAuctions);
