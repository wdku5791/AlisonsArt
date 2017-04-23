import React, { Component } from 'react';
import { Divider, Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/userActionCreator.jsx';
import ArtistAuctions from './ArtistProfile/ArtistAuctions.jsx';

class SaveFollow extends Component {
  componentWillMount() {
    let { userId } = this.props.match.params;
    fetch('/saves/' + userId, {
      headers: new Headers ({'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`})
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.dispatch(UserActions.fetchedSaves(data));
    })
    .catch(err => {
      alert('Sorry, an error occurred!');
    });
  }
  render() {
    let { savedAuctions, followingArtists, dispatch, history } = this.props;
    return (
      <Container>
        Saved auctions:
        <Grid divided={true}>
          <Grid.Row columns={3}>
          {savedAuctions.map(auction => {
            return (
              <Grid.Column key={auction.id}>
                <ArtistAuctions auction={auction} dispatch={dispatch} history={history} />
              </Grid.Column>)
          })}
          </Grid.Row>
        </Grid>
        <Divider />
        <div>
          Following artists:

        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    savedAuctions: state.user.savedAuctions,
    followingArtists: state.user.followingArtists
  }
}

export default connect(mapStateToProps)(SaveFollow);
