import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Divider, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Container>
      <NavLink to="#">Saves & Follows</NavLink>
      {'  '}
      <NavLink to="#">Auctions</NavLink>
      {'  '}
      <NavLink to="#">Settings</NavLink>
      {'  '}
      <NavLink to="#">Payments</NavLink>
    </Container>
  );
}
      // {this.props.}


const User = (props) => {
  console.log('props: ', props);
  if (!props.user.username) {
    return (<div>Please log in</div>);
  } else {
    return (
      <Container>
        <Container>
          {props.user.username[0].toUpperCase().concat(props.user.username.slice(1))}
        </Container>
      <Divider />
      User page
      <Navigation />
      </Container>
    );
    
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(User);