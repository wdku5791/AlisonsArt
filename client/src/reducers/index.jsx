import { combineReducers } from 'redux';
 //change these two reducers to ours
 import auctionReducer from './auctionReducer.jsx';
 import artistReducer from './artistReducer.jsx';
 const rootReducer = combineReducers({
  auctions: auctionReducer,
  artists: artistReducer
});
 
 export default rootReducer;
