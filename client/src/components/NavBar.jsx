import React, { Component } from 'react';
import LoggedOutNav from './LoggedOutNav.jsx';
import { Image } from 'semantic-ui-react';


class NavBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div>
		  <Image avatar src="./assets/logo.jpeg" alt="homepage pic" />
		  <LoggedOutNav />
		</div>);
	}

}

export default NavBar;