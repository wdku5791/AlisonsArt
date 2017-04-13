import React from 'react';
import * as actions from '../actions/auctionActionCreator.jsx';
import { Container } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Auctions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchingAuctions(true));

    fetch('/auctions')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.json());
      } else {
        dispatch(actions.fetchingAuctions(false));
        response.json()
        .then((auctions) => {
          dispatch(actions.ongoingAuctionsFetchedSuccess(auctions));
        });
      }
    })
    .catch((err) => {
      dispatch(actions.fetchAuctionErrored(true, err));
    });
  }

  render() {
    const { auctions } = this.props;
    return (
      <div>
        {auctions.map(auction => (
          <Container>
            <Image src={auction.artwork.image_url}></Image>
          </Container>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auctions: state.auctions.fetchedOngoingAuctions };
};

export default connect(mapStateToProps)(Auctions);
