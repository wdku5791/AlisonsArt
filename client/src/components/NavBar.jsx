import React, { Component } from 'react';
// import LoggedOutNav from './LoggedOutNav.jsx';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


class NavBar extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
		<div>
		  <Image avatar src="./assets/logo.jpeg" alt="homepage pic" />
		  <h1>ArtPoint</h1>
		  <div>
			  <input type="text" placeholder="search" />
			  {'  '}
			  <Link to="/home">Home</Link>
			  {'  '}
			  <Link to="/auctions">Auctions</Link>
			  {'  '}
			  <Link to="/artists">Artists</Link>
			  {'  '}
			  <Link to="/events">Events</Link>
			  {'  '}
			  <Link to="/contact">Contact us</Link>
			  {'  '}
			  <Link to="/login">Log In</Link>
			  {'  '}
			  <Link to="/signup">Sign Up</Link>
			  {this.props.children}
			</div>
		</div>);
	}

}

export default NavBar;