import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const _handleImageClick = (auction_id, history) => {
  history.push(`/auction/${auction_id}`);
};

const _formatMoney = (money) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

const _helper = (auction, history) => {
  if (auction) {
    return (
      <div className="frame-square">
        <div className="imageLink thumbnails" style={{backgroundImage: `url(${auction.image_url})`}} onClick={() => {
              _handleImageClick(auction.auction_id, history);
            }} />
          
        <div>
          <span className="artName">
            {auction.art_name}
          </span>
          {auction.current_bid ? <span>
            <br /><span>Current bid price: ${_formatMoney(+auction.current_bid)}</span></span>: null}
          <br />
          <span>Estimated value: ${_formatMoney(+auction.estimated_price)}</span>
        </div>
      </div>
    );
  } else {
    return (
      <p>
      loading~~
      </p>
    );
  }
};

const ArtistAuctions = (props) => {
  let { auction, dispatch, history } = props;
  return _helper(auction, history);
};

export default ArtistAuctions;
