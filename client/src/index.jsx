import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link,
	browserHistory
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { Container, Divider } from 'semantic-ui-react';

import { createStore } from 'redux';
import Home from './components/Home.js';
import Auctions from './components/Auctions.jsx';
// import reducer from './reducers/index.jsx';
import NavBar from './components/NavBar.jsx';

// const store = createStore(reducer);

const Index = () => {
	return (
	<Router history={browserHistory}>
	  <Container>
	    <NavBar />
	    <Route path="/" component={ Home } />
	    <Route path="/auctions" component={ Auctions } />

	    <Divider hidden />

	  </Container>
	</Router>)
}

render(
	<Provider store={store}>
	  <Index/>
	</Provider>, 
	document.getElementById('root')
);
