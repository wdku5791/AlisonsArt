import { combineReducers } from 'redux';

import auctionsReducer from './auctionsReducer.jsx';
import auctionReducer from './auctionReducer.jsx';
import artistReducer from './artistReducer.jsx';
import userReducer from './userReducer.jsx';
import bidReducer from './bidReducer';
import socketReducer from './socketReducer.jsx';
import notificationReducer from './notificationReducer.jsx';

const rootReducer = combineReducers({
  auctions: auctionsReducer,
  auction: auctionReducer,
  artists: artistReducer,
  user: userReducer,
  bid: bidReducer,
  socket: socketReducer,
  notifications: notificationReducer,
});

export default rootReducer;
