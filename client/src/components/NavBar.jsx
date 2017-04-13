import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';


class NavBar extends Component {
  render() {
    let {username, userId} = this.props;
    console.log('userid is: ', userId);
    let LoggedOutNav = (
        <span>
          {'  '}
          <NavLink to="/login" >Log In</NavLink>
          {'  '}
          <NavLink to="/signup" >Sign Up</NavLink>
        </span>
      );

    let LoggedInNav = (
      <span>
        {'  '}
        <NavLink to={"/user/"+userId} >{username}</NavLink>
        {'  '}
        <NavLink to="/logout" >Log out</NavLink>
        {'  '}
        <NavLink to="/notification" >Noties</NavLink>
      </span>
    );

    return (
      <div>
        <Image avatar src="./assets/logo.jpeg" alt="homepage pic" />
        <h1>ArtPoint</h1>
        <div>
          <input type="text" placeholder="search" />
          {'  '}
          <NavLink to="/home">Home</NavLink>
          {'  '}
          <NavLink to="/auctions">Auctions</NavLink>
          {'  '}
          <NavLink to="/artists" >Artists</NavLink>
          {'  '}
          <NavLink to="/createAuction" >Create an auction</NavLink>
          {'  '}
          <NavLink to="/events" >Events</NavLink>
          {'  '}
          <NavLink to="/contactus" >Contact us</NavLink>
          {username === '' ? LoggedOutNav : LoggedInNav}
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(NavBar);
