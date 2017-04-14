const initialState = {
  bid: 0,
  sendingBid: false,
  error: null,
  bidErrored: false
};


const bidReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BID':
      return {
        ...state,
        bid: action.bid
      };
    default:
      return state;
  }
};

export default bidReducer;