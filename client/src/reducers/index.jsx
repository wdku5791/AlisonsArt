import { combineReducers } from 'redux';

import auctionsReducer from './auctionsReducer.jsx';
import auctionReducer from './auctionReducer.jsx';
import artistReducer from './artistReducer.jsx';
import userReducer from './userReducer.jsx';
import bidReducer from './bidReducer';

const rootReducer = combineReducers({
  auctions: auctionsReducer,
  auction: auctionReducer,
  artist: artistReducer,
  user: userReducer,
  bid: bidReducer
});

export default rootReducer;

