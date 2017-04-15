const initialState = {
  notifications: [],
  fetchingNoties: false,
  error: false,
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCHING':
      return {
        ...state,
        fetchingNoties: action.bool
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.bool
      };
    case 'FETCH_COMPLETE':
      return {
        ...state,
        notifications: action.notifications
      };
    default:
      return state;
  }
}

export default notificationReducer;
