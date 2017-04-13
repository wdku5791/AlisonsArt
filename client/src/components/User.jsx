import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Divider, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <Container>
      <NavLink to={"/user/" + props.userId + '/savesFollows'}>Saves & Follows</NavLink>
      {'  '}
      <NavLink to={"/user/" + props.userId + '/auctions'}>Auctions</NavLink>
      {'  '}
      <NavLink to={"/user/" + props.userId + '/settings'}>Settings</NavLink>
      {'  '}
      <NavLink to={"/user/" + props.userId + '/payments'}>Payments</NavLink>
    </Container>
  );
}

const User = (props) => {
  console.log('props: ', props);
  console.log(props.user.userId);
  if (!props.user.username) {
    return (<div>Please log in</div>);
  } else {
    return (
      <Container>
        <Container>
          {props.user.username[0].toUpperCase().concat(props.user.username.slice(1))}
        </Container>
      <Divider />
      <Navigation userId={props.user.userId} />
      
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