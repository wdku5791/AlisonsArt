import React, { Component } from 'react';
import {Divider, Container } from 'semantic-ui-react';
import SavedAuctions from './userProfile/SavedAuctions.jsx';

class SaveFollow extends Component {
  componentWillMount() {
    let { userId } = this.props.match.params;
    fetch('/saves/' + userId, {
      headers: new Headers ({'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`})
    })
    .then(response => {
      console.log('got response');
      return response.json();
    })
    .then(data => {
      console.log('this is data: ', data);
    })
    .catch(err => {
      console.log('errored!');
    });
  }
  render() {
    return (
      <Container>
        <div>
          Saved auctions:
          
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
export default SaveFollow;