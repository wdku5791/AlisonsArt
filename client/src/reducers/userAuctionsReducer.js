const initialState = {
  isFetching: false,
  openAuctions: [],
  closedAuctions: [],
  hasErrored: false,
  error: null
};

const userAuctionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_AUCTION_ERROR':
      return {
        ...state,
        fetchAuctionsError: action.error,
        hasErrored: true
      };
    case 'FETCHING_USER_AUCTION':
      return {
        ...state,
        isFetching: action.isFetching
      };
    case 'USER_AUCTIONS_FETCHED':
      return {
        ...state,
        openAuctions: action.userAuctions.filter(auction => !auction.closed),
        closedAuctions: action.userAuctions.filter(auction => auction.closed)
      };
    default:
      return state;
  }
 };
 
 export default userAuctionsReducer;
