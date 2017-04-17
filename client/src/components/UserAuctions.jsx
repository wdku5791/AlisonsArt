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
    const { dispatch, user } = this.props;
    dispatch(userAuctions.fetchingAnAuction(true));

    fetch('/auctions/ongoing', {
      method: 'POST',
      body: JSON.stringify({user: user})
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
        dispatch(userAuctions.fetchingAnAuction(false));
        return response.json();
    })
    .then(data => {
      dispatch(userAuctions.userAuctionsFetched(data));
    })
    .catch((err) => dispatch(userAuctions.userAuctionsErrored(err)));
  }

  render() {
  //   const auction = this.props.closedAuctions[0];


  //   if (auction.won) {
  //     let message = <button>Send Payment</button>;
  //   } else {
  //     let message = <button>More by this Artist</button>;
  //   }
  //   return (
  //     <Container>
  //       <Container className="ui medium images">
  //         <Image className="ui image" src={auction.image_url} />
  //       </Container>
  //       <Container>
  //         <p>Description: {auction.description}</p>
  //         <p>Year: {auction.artwork.age}</p>
  //         <p>Closing Price ($USD): {auction.current_bid}</p>
  //         {message}
  //       </Container>
  //     </Container>
  //   );
  // }
  return (
    <div>Auctions</div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    openAuctions: state.userAuctions.openAuctions,
    closedAuctions: state.userAuctions.closedAuctions,
    user: state.user
  };
};

export default connect(mapStateToProps)(UserAuctions);
