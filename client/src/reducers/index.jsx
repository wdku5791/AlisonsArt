import { combineReducers } from 'redux';
 //change these two reducers to ours
 import auctionReducer from './auctionReducer.jsx';
 const artApp = combineReducers({auctionReducer});
 
 export default artApp;