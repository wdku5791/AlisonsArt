import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Divider, Grid, Button, Segment } from 'semantic-ui-react';
//this imageGallery is causing a warning on React.createClass will be removed in v16
import * as ArtistAction from '../actions/artistActionCreator.jsx';
import ArtistAuctions from './ArtistProfile/ArtistAuctions.jsx';

class Artist extends Component {
  constructor(props){
    super(props);
    this._socialMedia = this._socialMedia.bind(this);
  }

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
    });
  }

  _socialMedia(link) {
    if(link) {
      window.open(link);
    }
  }
  
  render(){
    console.log('artistsssssst: ', this.props.artist);
    let { isFetching, fetchArtistErrored, fetchedArtist } = this.props.artist;
    if (fetchArtistErrored) {
      return (
        <div>
          Something's wrong and we can't get the info for this artist. Sorry!
        </div>
      );
    } else if (isFetching) {
      return (
        <div>
          loading~~
        </div>
      );
    } else {
      if (Object.keys(fetchedArtist).length === 0) {
        return(
          <div>
            still loading~
          </div>
        );
      } else {
        let { fb_link, inst_link, twitter_link, profile } = fetchedArtist.profile;
        console.log('im links: ', fb_link);
        console.log('im inst: ', inst_link);
        console.log('im twitter: ', twitter_link);
        return (
          <Container>
            <Container>
              <Container>
                <span>artist name</span>
                {' '}
                <button>Direct message</button>
                {' '}
                <Button circular color='facebook' icon='facebook' onClick={() => {
                  this._socialMedia(fb_link);
                }}/>
                {' '}
                <Button circular color='twitter' icon='twitter'/>
                {' '}
                <Button circular color='instagram' icon='instagram'/>
              </Container>
              <Grid verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column width={8} >
                    <Image src="./assets/temp.png" centered />
                  </Grid.Column>
                  <Grid.Column width={8}>
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
                  <h3>Ongoing auctions:</h3>
                  <ArtistAuctions flag="current" />
                </Grid.Column>
                <Grid.Column>
                  <h3>Previous auctions:</h3>
                  <ArtistAuctions flag="previous" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )
      }
    }
  } 
}

const mapStateToProps = (state) => {
  return {
    artist: state.artist
  }
}
export default connect(mapStateToProps)(Artist);
