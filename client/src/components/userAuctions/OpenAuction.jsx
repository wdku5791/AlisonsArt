import React, { Component } from 'react';
import { Container, Image, Grid } from 'semantic-ui-react';

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
    <Grid.Column>
      <Image
        className="imageLink"
        src={auction.image_url}
        onClick={() => handleClick(auction.id)}
      />
      <Container>
        <h4 className>{auction.art_name}</h4>
        <p>{auction.first_name} {auction.last_name} ({auction.age})</p>
        <p>Current Bid ($USD): {auction.current_bid}</p>
        {message}
      </Container>
    </Grid.Column>
  );
};

export default OpenAuction;
