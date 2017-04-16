import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const _handleImageClick = (auction_id, history) => {
  history.push('/auction/' + auction_id);
};

const _helper =(auctions, history) => {
  if(auctions) {
    if(auctions.length === 0){
      return (
        <div>
          No auctions
        </div>
      );
    } else {
      //want to add onClick for Images.
      //find the styling first.
      return (
        <Container>
          {auctions.map(auction => {
            return (
              <div key={auction.artwork_id}>
                <Image 
                  className='imageLink'
                  src={auction.image_url}
                  onClick={() => {
                    _handleImageClick(auction.auction_id, history);
                  }} 
                />
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
    return(
      <p>
      loading~~
      </p>
    );
  }
}

const ArtistAuctions = (props) => {
  let { flag, ongoingAuctions, passedAuctions, dispatch, history } = props;
  if(flag === 'current') {
    return _helper(ongoingAuctions, history);
  } 
  else if(flag === 'previous'){
    return _helper(passedAuctions, history);
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