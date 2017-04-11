import { combineReducers } from 'redux';
 //change these two reducers to ours
 import auctionsReducer from './auctionsReducer.jsx';
 import auctionReducer from './auctionReducer.jsx';
 import artistReducer from './artistReducer.jsx';
 const rootReducer = combineReducers({
  auctions: auctionsReducer,
  auction: auctionReducer,
  artists: artistReducer
});
 
 export default rootReducer;
