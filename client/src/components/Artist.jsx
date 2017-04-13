import React, { Component } from 'react';
import { connect } from 'react-redux';


class Artist extends Component {

  componentWillMount() {
    //fetch all data about this artist
  }

  
  render(){
    console.log('heello?');
    console.log('artist id: ', this.props.match.params.artistId);
  // let auction = this.props.auction.auction;
  //need to get the buyout price of this piece and the current bidding price of the piece, then generate values for the dropbox.

  //submit button onClick will grab the dropbox value, userId and auctionId, direct to payment page.
    //send a backend request to get the data for this page
    // let artist = fetchArtist(this.props.match.params.artistId);
    return (
      <div>
       yoyoyoyoyoyoyoyo
        <img />
        <p></p>
      </div>
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
// export default Artist;
