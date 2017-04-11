const initialState = {
  username: '',
  userId: null,
  checkingInfo: false,
  error: null
};


export function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'CHECK_SIGN_IN':
      return {
        ...state,
        checkingInfo: true
      };
    case 'SIGN_IN_COMPLETE':
      return {
        ...state,
        username: action.username,
        userId: action.userId,
        checkingInfo: false
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        error: action.error,
        checkingInfo: false
      };
    default:
      return state;
  }
}
