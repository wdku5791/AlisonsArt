const initialState = {
  auction: {},
  isFetchingAuction: false
};

const auctionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCHING_AN_AUCTION':
    return {
      ...state,
      isFetchingAuction: true
    }
    case 'FETCHED_AN_AUCTION':
      return {
        ...state,
        isFetchingAuction: false,
        auction: action.auction
      }
    default:
      return state;
  }
}

export default auctionReducer;