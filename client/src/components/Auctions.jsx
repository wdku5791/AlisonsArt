import React from 'react';
import * as actions from '../actions/auctionActionCreator.jsx';
import { Container, Image, Label, Button, Card, Grid } from 'semantic-ui-react';

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
            <Grid.Row columns={2}>
              {auctions.map(auction => (
                <Grid.Column key={auction.id}>
                  <Container className="center">
                    <Card onClick={() => this.goToAuction(auction.id)}>
                    <Image className="medium" src={auction.artwork.image_url} />
                      <Card.Content>
                        <Card.Header>
                          {auction.artwork.art_name}
                        </Card.Header>
                        <Card.Meta>
                          Bid Now: {auction.current_bid}
                        </Card.Meta>
                        <Card.Description>
                          {auction.artwork.description}
                        </Card.Description>

                      </Card.Content>
                    </Card>
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
