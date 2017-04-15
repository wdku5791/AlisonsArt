import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Divider, Grid, Button, Segment } from 'semantic-ui-react';
//this imageGaller is causing a warning on React.createClass will be removed in v16
import ImageGallery from 'react-image-gallery';

const CurrentAuctions = () => {
  return (
    <Container>
    im current auctions
    </Container>
  );
}

const PreviousAuctions = () => {
  return (
    <Container>
    im previous auctions
    </Container>
  );
}

class Artist extends Component {

  componentWillMount() {
    //fetch all data about this artist
    //should have a detailed, user customized profile
    let artistId = this.props.match.params.artistId;
    fetch('/artist/' + this.props.match.params.artistId, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      console.log('so happy!');
      console.log('response: ', response);
      return response.json();
    })
    .then(data => {
      console.log('im data in artist: ', data);
    })
    .catch(err => {
      console.log('not happy');
    })
  }
  
  render(){
    console.log('artist id: ', this.props.match.params.artistId);
  // let auction = this.props.auction.auction;

    //send a backend request to get the data for this page
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
  }
}
//connect to the store to get the artwork to render:
const mapStateToProps = (state) => {
  return {
    artists: state.artists
  }
}
export default connect(mapStateToProps)(Artist);
