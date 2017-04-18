import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';

const OpenAuction = ({auction, history}) => {
  let message;

  const handleClick = (id) => {
    history.push(`/auction/${id}`);
  };

  if (auction.isHighestBidder) {
    message = <button onClick={() => handleClick(auction.id)}>You're Winning!</button>;
  } else {
    message = <button onClick={() => handleClick(auction.id)}>You've Been Outbid!</button>;
  }
  return (
    <div className="user_auctions">
      <Container>
        <Container className="ui medium images">
          <Image className="ui image" src={auction.image_url} />
        </Container>
        <Container>
          <p>Description: {auction.description}</p>
          <p>Year: {auction.age}</p>
          <p>Current Bid ($USD): {auction.current_bid}</p>
          {message}
        </Container>
      </Container>
    </div>
  );
};

export default OpenAuction;