const initialState = {
  notifications: [],
  fetchingNoties: false,
  error: false,
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCHING_NOTIFICATIONS':
      return {
        ...state,
        fetchingNoties: action.fetchingNoties
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'FETCH_COMPLETE':
      return {
        ...state,
        notifications: action.notifications
      };
    case 'UPDATE':
      return {
        ...state,
        notifications: action.notifications
      };
    default:
      return state;
  }
}

export default notificationReducer;
