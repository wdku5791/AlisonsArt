import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const _handleImageClick = (auction_id, history) => {
  history.push('/auction/' + auction_id);
};

const _helper =(auction, history) => {
  if(auction) {
    console.log('auction: ', auction);
    //want to add onClick for Images.
    //find the styling first.
    return (
      <Container>
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
          {auction.current_bid ? <span><br /><span>Current bid price: {auction.current_bid}</span></span> : null}
          <br />
          <span>Estimated value: {auction.estimated_price}</span>
          <br />
        </div>
      </Container>
    );
  } else {
    return(
      <p>
      loading~~
      </p>
    );
  }
}

const ArtistAuctions = (props) => {
  let { auction, dispatch, history } = props;
  return _helper(auction, history);
}

export default ArtistAuctions;
