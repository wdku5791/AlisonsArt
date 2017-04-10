import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link,
	hashHistory
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { Container, Divider } from 'semantic-ui-react';

import { createStore } from 'redux';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.js';
import reducer from './reducers/index.jsx';
import Auctions from './components/Auctions.jsx';
import Artists from './components/Artists.jsx';
import Events from './components/Events.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx'

const store = createStore(reducer);
// nest children Routes into NavBar component can solve the rendering of the child components
const Index = () => {
	return (
		<Router history={hashHistory}>
			<NavBar>
				<Route path="/home" component={Home} />
				<Route path="/auctions" component={Auctions} />
				<Route path="/artists" component={Artists} />
				<Route path="/events" component={Events} />
				<Route path="/login" component={LogIn} />
				<Route path="/signup" component={SignUp} />
			</NavBar>
		</Router>
	)
}

render(
	<Provider store={store}>
		<Index/>
	</Provider>, 
	document.getElementById('root')
);
