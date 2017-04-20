import React from 'react';
import * as actions from '../actions/auctionActionCreator.jsx';
import { Container, Image, Label, Button, Card, Grid, Divider } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Auctions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchingAuctions(true));

    fetch('/auctions', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.json());
      } else {
        dispatch(actions.fetchingAuctions(false));
        response.json()
        .then((auctions) => {
          console.log('auctions in Auctions: ', auctions);
          // dispatch(actions.ongoingAuctionsFetchedSuccess(auctions));
        });
      }
    })
    .catch((err) => {
      dispatch(actions.fetchAuctionErrored(true, err));
    });
  }

  goToAuction(id) {
    const { history } = this.props;
    history.push(`/auction/${id}`);
  }

  render() {
    const { auctions } = this.props;
    if(auctions.length === 0) {
      return <div>loading~~</div>
    } else {
      return (
        <Container>
          <Grid divided={true}>
            <Grid.Row columns={3}>
              {auctions.map(auction => (
                <Grid.Column key={auction.id}>
                  <Image 
                    className='imageLink'
                    src={auction.artwork.image_url} 
                    onClick={() => this.goToAuction(auction.id)}
                    label={{ as: 'a', color: 'black', content: '$' + auction.current_bid, ribbon: true }} 
                  />
                  <Container>
                    <h4 className='imageHeader'>
                      {auction.artwork.art_name}
                    </h4>
                    <Divider />
                    <p className='artworkDescription'>{auction.artwork.description}</p>
                  </Container>
                </Grid.Column>
                )
              )}
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { auctions: state.auctions.fetchedOngoingAuctions };
};

export default connect(mapStateToProps)(Auctions);
