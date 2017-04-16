import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Divider, Grid, Button, Segment } from 'semantic-ui-react';
//this imageGallery is causing a warning on React.createClass will be removed in v16
import ImageGallery from 'react-image-gallery';
import * as ArtistAction from '../actions/artistActionCreator.jsx';
import CurrentAuctions from './ArtistProfile/CurrentAuctions.jsx';
import PreviousAuctions from './ArtistProfile/PreviousAuctions.jsx';

class Artist extends Component {

  componentWillMount() {
    //should have a detailed, user customized profile
    let { dispatch } = this.props;
    let artistId = this.props.match.params.artistId;
    dispatch(ArtistAction.fetchingArtist(true));
    fetch('/artist/' + this.props.match.params.artistId)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      dispatch(ArtistAction.fetchingArtist(false));
      dispatch(ArtistAction.fetchArtistSuccess(data));
      dispatch(ArtistAction.fetchArtistErrored(false, null));
    })
    .catch(err => {
      dispatch(ArtistAction.fetchingArtist(false));
      dispatch(ArtistAction.fetchArtistErrored(true, err));
    })
  }
  
  render(){
    console.log('artistsssssst: ', this.props.artist);
    let { isFetching, fetchArtistErrored } = this.props;
    if( !isFetching && !fetchArtistErrored) {
      return (
        <Container>
          <Container>
            <Container>
              <span>artist name</span>
              {' '}
              <button>Direct message</button>
              {' '}
              <Button circular color='facebook' icon='facebook' />
              {' '}
              <Button circular color='twitter' icon='twitter'/>
            </Container>
            <Grid verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={2} >
                  <button>prev</button>
                </Grid.Column>
                <Grid.Column width={6} >
                  <Image src="./assets/temp.png" centered />
                </Grid.Column>
                <Grid.Column width={2} >
                  <button>next</button>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Container fluid textAlign="justified">
                    Im the artist, I rock!
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                Ongoing auctions:
                <CurrentAuctions />
              <Divider vertical />
              </Grid.Column>
              <Grid.Column>
                Previous auctions:
                <PreviousAuctions />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )
    } else if (fetchArtistErrored){
      return (
        <p>
          An error happened, we are sorry
        </p>
      );
    } else {
      return (
        <p>
          loading~~~~~
        </p>
      );
    }
  } 
}

const mapStateToProps = (state) => {
  return {
    artist: state.artist
  }
}
export default connect(mapStateToProps)(Artist);
