import { combineReducers } from 'redux';

import auctionsReducer from './auctionsReducer.jsx';
import auctionReducer from './auctionReducer.jsx';
import artistReducer from './artistReducer.jsx';
import userReducer from './userReducer.jsx';

const rootReducer = combineReducers({
  auctions: auctionsReducer,
  auction: auctionReducer,
  artists: artistReducer,
  user: userReducer
});
 
export default rootReducer;

