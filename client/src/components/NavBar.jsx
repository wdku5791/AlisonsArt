import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

let linkStyling = {
  'font-size': '18',
  'color': '#474a4f'
}

class NavBar extends Component {
  render() {
    let {username, userId} = this.props;

    let LoggedOutNav = (
        <span style={{'float': 'right'}}>
          <NavLink style={linkStyling} to="/login" >Log In</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/signup" >Sign Up</NavLink>
        </span>
      );

    let LoggedInNav = (
      <span style={{'float': 'right'}}>
        {'  '}
        <NavLink style={linkStyling} to={"/user/"+userId} >{username}</NavLink>
        {' | '}
        <NavLink style={linkStyling} to="/logout">Log out</NavLink>
        {' | '}
        <NavLink style={linkStyling} to="/notification" >Noties</NavLink>
      </span>
    );

    return (
      <div>
        <h1> <Image avatar src='./assets/logo.jpeg' />ArtPoint</h1>
        <div>
          {'  '}
          <NavLink style={linkStyling} to="/home">Home</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/auctions">Auctions</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/artists" >Artists</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/createAuction" >Create an auction</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/events" >Events</NavLink>
          {' | '}
          <NavLink style={linkStyling} to="/contactus" >Contact us</NavLink>
          {username === '' ? LoggedOutNav : LoggedInNav}
          {this.props.children}
          <input style={{'height': '26px', 'font-size': 18, 'margin-left': '20px'}}type="text" placeholder="search" />
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
