import React, { Component } from 'react';
import {Divider, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SavedAuctions from './userProfile/SavedAuctions.jsx';
import ArtistAuctions from './ArtistProfile/ArtistAuctions.jsx';
import * as UserActions from '../actions/userActionCreator.jsx';

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
    return (
      <Container>
        <div>
          Saved auctions:
          <ArtistAuctions flag="saves" history={this.props.history}/>
        </div>
        <Divider />
        <div>
          Following artists:
        </div>
      </Container>
    );
  }
}


//needs to fetch data from backend for rendering
export default connect()(SaveFollow);
