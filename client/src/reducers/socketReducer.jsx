const initialState = {

};

const socketReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MESSAGE':
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
    default:
      return state;
  }
 };
 
 export default socketReducer; 
 