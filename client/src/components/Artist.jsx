import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Grid } from 'semantic-ui-react';


const CurrentAuctions = () => {
  return (
    <div>
    im current auctions
    </div>
  );
}

const PreviousAuctions = () => {
  return (
    <div>
    im previous auctions
    </div>
  );
}

class Artist extends Component {

  componentWillMount() {
    //fetch all data about this artist
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
          <div>
            <span>artist name</span>
            {' '}
            <button>Direct message</button>
            <button>fb</button>
            <button>twitter</button>
            <button>instagram</button>
          </div>
          <div>
            <button>prev</button>
            <img src="./assets/temp.png" />
            <button>next</button>
            <textarea rows="4" cols="20" />
          </div>
        </Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              Ongoing auctions:
              <CurrentAuctions />
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
