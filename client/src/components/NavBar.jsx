import React, { Component } from 'react';
// import LoggedOutNav from './LoggedOutNav.jsx';
import { NavLink } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


class NavBar extends Component {

	render() {
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
			  <NavLink to="/events" activeStyle={{color: 'red'}}>Events</NavLink>
			  {'  '}
			  <NavLink to="/contactus" activeStyle={{color: 'red'}}>Contact us</NavLink>
			  {'  '}
			  <NavLink to="/login" activeStyle={{color: 'red'}}>Log In</NavLink>
			  {'  '}
			  <NavLink to="/signup" activeStyle={{color: 'red'}}>Sign Up</NavLink>
			  {this.props.children}
			</div>
		</div>);
	}

}

export default NavBar;