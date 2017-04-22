const initialState = {

};

const socketReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RESPONSE':
      return {
        ...state,
        message: action.data
      };
      case 'ERROR_SOCKET':
      return {
        ...state,
        error: action.data
      };
    case 'socket/LOGIN':
      return {
        ...state,
        id: action.data
      };
    case 'socket/LOGOUT':
      return {
        ...state,
        id: action.data
      };
    case 'socket/LOGOUT_COMPLETE':
      return {
        ...state,
        id: action.data
      };
    case 'UPDATE_NEW_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.data
      };
      }
    default:
      return state;
  }
 };
 
 export default socketReducer; 
 