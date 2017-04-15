const initialState = {

};

const socketReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MESSAGE':
      return {
        ...state,
        message: action.data
      }
    default:
      return state;
  }
 };
 
 export default socketReducer; 