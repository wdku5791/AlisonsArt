import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const _handleImageClick = (auction_id, history) => {
  console.log('hadle history: ', history);
  history.push('/auction/' + auction_id);
};

const _helper =(auctions, history) => {
  console.log('auction: ', auctions);
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
  let { flag, ongoingAuctions, passedAuctions, savedAuctions, followingArtists,dispatch, history } = props;
  console.log('props; ', props);
  console.log('history: ', history);
  if(flag === 'current') {
    return _helper(ongoingAuctions, history);
  } 
  else if(flag === 'previous'){
    return _helper(passedAuctions, history);
  } else if(flag === 'saves') {
    return _helper(savedAuctions, history);
  } else if(flag === 'following') {
    return _helper(followingArtists, history);
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
    passedAuctions: state.artist.fetchedArtist.passedAuctions,
    savedAuctions: state.user.savedAuctions,
    followingArtists: state.user.followingArtists
  }
}

export default connect(mapStateToProps)(ArtistAuctions);