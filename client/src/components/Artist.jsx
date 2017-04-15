import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Divider, Grid, Button, Segment } from 'semantic-ui-react';


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
    fetch('')
  }
  
  render(){
    console.log('artist id: ', this.props.match.params.artistId);
  // let auction = this.props.auction.auction;
  //need to get the buyout price of this piece and the current bidding price of the piece, then generate values for the dropbox.

  //submit button onClick will grab the dropbox value, userId and auctionId, direct to payment page.
    //send a backend request to get the data for this page
    // let artist = fetchArtist(this.props.match.params.artistId);
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
