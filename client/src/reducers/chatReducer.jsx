const initialState = {
<<<<<<< HEAD
  receiverId: null,
  messages: [],
  roomname: null,
=======

>>>>>>> able to live render messages back to client as sent. Uses middleware via redux
};

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'socket/CHAT_MESSAGE':
      return {
        ...state,
        messages: state.messages.concat(action.data)
      }
    case 'GETTING_RECEIVER_ID':
      return {
        ...state,
        receiverId: action.data
      }
    case 'GETTING_CHAT_LOG':
      return {
        ...state,
        receiverId: action.data[0],
        messages: action.data[1]
      }
    case: 'socket/JOIN_ROOM':
      return {
        ...state,
        roomname: action.data
        chatMessage: action.data
      }
    default: 
      return state;
  }
};

export default chatReducer;