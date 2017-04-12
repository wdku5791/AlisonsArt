import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';


class NavBar extends Component {
  render() {
    console.log('childrenrenrenre: ', this.props.children);
    console.log('state: ', this.props.username);
    console.log('he');
    let LoggedOutNav = (
        <span>
          {'  '}
          <NavLink to="/login" activeStyle={{color: 'red'}}>Log In</NavLink>
          {'  '}
          <NavLink to="/signup" activeStyle={{color: 'red'}}>Sign Up</NavLink>
        </span>
      );
    let LoggedInNav = (
      <span>
        {'  '}
        <NavLink to="/logout" activeStyle={{color: 'red'}}>Log out</NavLink>
        {'  '}
        <NavLink to="/notification" activeStyle={{color: 'red'}}>Noties</NavLink>
      </span>
    );
    return (
      <div>
        <Image avatar src="./assets/logo.jpeg" alt="homepage pic" />
        <h1>ArtPoint</h1>
        <div>
          <input type="text" placeholder="search" />
          {'  '}
          <NavLink to="/home" activeStyle={{color: 'red'}}>Home</NavLink>
          {'  '}
          <NavLink to="/auctions" activeStyle={{color: 'red'}}>Auctions</NavLink>
          {'  '}
          <NavLink to="/artists" activeStyle={{color: 'red'}}>Artists</NavLink>
          {'  '}
          <NavLink to="/createAuction" activeStyle={{color: 'red'}}>Create an auction</NavLink>
          {'  '}
          <NavLink to="/events" activeStyle={{color: 'red'}}>Events</NavLink>
          {'  '}
          <NavLink to="/contactus" activeStyle={{color: 'red'}}>Contact us</NavLink>
          {LoggedOutNav}
          {LoggedInNav}
          {this.props.children}
        </div>
      </div>
    );
  }
}
// export default NavBar;

const mapStateToProps = (state) => {
  console.log('statesssss:', state);
  return {
    username: state.user
  }
}

export default connect(mapStateToProps)(NavBar);



