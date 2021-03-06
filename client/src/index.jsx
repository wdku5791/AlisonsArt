import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  IndexRoute
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import reducer from './reducers/index.jsx';
import Auctions from './components/Auctions.jsx';
import Auction from './components/Auction.jsx';
import Artists from './components/Artists.jsx';
import Artist from './components/Artist.jsx';
import Events from './components/Events.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/LogIn.jsx';
import User from './components/User.jsx';
import CreateAuctionContainer from './components/createAuctionContainer.jsx';
import Notification from './components/Notification.jsx';
import ContactUs from './components/ContactUs.jsx';
import MessageBar from './components/WriteMessage.jsx'
import io from 'socket.io-client';
import * as UserActions from './actions/userActionCreator.jsx';
import * as SocketActions from './actions/socketActionCreator.jsx';

let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");

const middleware = applyMiddleware(thunkMiddleware, logger, socketIoMiddleware);
const store = createStore(reducer, middleware);

store.dispatch({type:'socket/hello', data:'Hello!'});

//need to have a route for finished auctions that can't be bid
class Index extends Component {

  componentWillMount() {
    fetch('/rehydrate', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      })
    })
    .then(response => {
      if (!response.ok) {
        throw Error('authorization error');
      }
      
      if (response.headers.get('x-username') && response.headers.get('x-userId')) {
        store.dispatch(UserActions.logInSuccess(response.headers.get('x-username'), response.headers.get('x-userId'), response.headers.get('x-type') === 'artist'));
        store.dispatch(SocketActions.loginSocket(response.headers.get('x-userId')));
      }
    })
    .catch(err => {
      alert(err.message);
    });
  }

  render() {
    return (
      <Router>
        <Container>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/auctions" component={Auctions} />
          <Route path="/auction/:auctionId" component={Auction} />
          <Route path="/artists" component={Artists} />
          <Route path="/artist/:artistId" component={Artist} />
          <Route path="/user/:userId" component={User} />
          <Route path="/events" component={Events} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/notification" component={Notification} />
          <Route path="/createAuction" component={CreateAuctionContainer} />
          <MessageBar />
        </Container>
      </Router>
    )
  }
}

render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
