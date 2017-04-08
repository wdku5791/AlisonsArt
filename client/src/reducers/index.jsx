import { combineReducers } from 'redux';
//change these two reducers to ours
import auctionReducer from './auctionReducer.jsx';
const todoApp = combineReducers({auctionReducer});

export default todoApp;