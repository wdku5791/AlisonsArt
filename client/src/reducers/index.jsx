import { combineReducers } from 'redux';
//change these two reducers to ours
import todos from './todos.jsx';
import visibilityFilter from './visibilityFilter.jsx';

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

export default todoApp;