import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  IndexRoute,
  Link,
  hashHistory
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.js';
import reducer from './reducers/index.jsx';
import Auctions from './components/Auctions.jsx';
import Artists from './components/Artists.jsx';
import Events from './components/Events.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import CreateAuction from './components/CreateAuction.jsx';

const middleware = applyMiddleware(thunkMiddleware, createLogger());
const store = createStore(reducer, middleware);
// nest children Routes into NavBar component can solve the rendering of the child components
const Index = () => {
  console.log('store states: ', store.getState());
  return (
    <Router history={hashHistory}>
      <NavBar>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/auctions" component={Auctions} />
        <Route path="/artists" component={Artists} />
        <Route path="/events" component={Events} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/createAuction" component={CreateAuction} />
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
