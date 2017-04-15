const initialState = {
  auction: {},
  isFetchingAuction: false
};

const auctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_AN_AUCTION':
      return {
        ...state,
        isFetchingAuction: true
      };
    case 'FETCHED_AN_AUCTION':
      return {
        ...state,
        isFetchingAuction: false,
        auction: action.auction
      };
    case 'UPDATE_CURRENT_BID':
      return {
        ...state,
        isFetchingAuction: false,
        auction: {
          ...state.auction,
          current_bid: action.current_bid,
          current_bid_id: action.current_bid_id
        }
      };
    default:
      return state;
  }
};

export default auctionReducer;

