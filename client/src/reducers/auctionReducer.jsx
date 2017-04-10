const initialState = {
  isFetching: false,
  fetchedAuctions: [],
  fetchAuctionsError: null
};

const auctionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_AUCTION_ERROR':
      return {
        ...state,
        fetchAuctionsError: "fetching auction error!"
      };
    case 'FETCHING_AUCTION':
      return {
        ...state,
        isFetching: true
      };
    case 'AUCTIONS_FETCHED':
      return {
        ...state,
        fetchedAuctions: action.auctions
      };
    default:
      return state;
  }
 };
 
 export default auctionReducer; 