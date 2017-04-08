import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
// import { Grid, Icon, Header, Input, Menu, Segment } from 'semantic-ui-react';

class LoggedOutNav extends Component {
	constructor(props) {
		super(props);
		this.state = {activeItem: 'home'};
		this.handleItemClick =(e, { name }) => {
			this.setState({activeItem: name});
			
			// browserHistory.push('/auctions');
	    };
	}

	render() {
		const { activeItem } = this.state;

		return (
			<Grid>
			  <Grid.Column width={6} verticalAlign="middle">
			    <Header as="h1" textAlign="center"> 
			    Art Point
			    </Header>
			  </Grid.Column>
			  <Grid.Column>
			    <Segment inverted>
			      <Menu inverted secondary>
			        <input placeholder="search" type="text" />
			        <Menu.Item name="home" active={activeItem === "home"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="auctions" active={activeItem === "auctions"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="artists" active={activeItem === "artists"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="events" active={activeItem === "events"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="contact us" active={activeItem === "contact us"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="log in" active={activeItem === "log in"} onClick={this.handleItemClick} />
			        {'  '}
			        <Menu.Item name="sign up" active={activeItem === "sign up"} onClick={this.handleItemClick} />
			      </Menu>
			    </Segment>
			  </Grid.Column>
			</Grid>

			);
	}
}

export default LoggedOutNav;