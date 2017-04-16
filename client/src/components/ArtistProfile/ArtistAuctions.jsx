import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';


const _helper =(auctions) => {
  console.log('auctionss: ', auctions);
  if(auctions) {
    if(auctions.length === 0){
      return (
        <div>
          nothing to render for this artist here
        </div>
      );
    } else {
      return (
        <Container>
          {auctions.map(auction => {
            return (
              <div key={auction.artwork_id}>
                <Image src={auction.image_url} />
                <br />
                <span>Name: {auction.art_name}</span>
                <br />
                <span>Current bid price: {auction.current_bid}</span>
                <br />
                <span>Estimated value: {auction.estimated_price}</span>
                <br />
              </div>
            )
          })}
        </Container>
      );
    }
  } else {
    console.log('hehe');
    return(
      <p>
      loading~~
      </p>
    );
  }
}

const ArtistAuctions = (props) => {
  let { flag, ongoingAuctions, passedAuctions } = props;
  if(flag === 'current') {
    return _helper(ongoingAuctions);
  } 
  else if(flag === 'previous'){
    return _helper(passedAuctions);
  } 
  else {
    return (
      <div>
        Wrong flag. Nothing should render~
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ongoingAuctions: state.artist.fetchedArtist.ongoingAuctions,
    passedAuctions: state.artist.fetchedArtist.passedAuctions
  }
}

export default connect(mapStateToProps)(ArtistAuctions);