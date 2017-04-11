const initialState = {
  isFetching: false,
  fetchedOngoingAuctions: [],
  fetchedPassedAuctions: [],
  hasErrored: false,
  fetchAuctionsError: null
};

const auctionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_AUCTION_ERROR':
      return {
        ...state,
        isFetching: false,
        fetchAuctionsError: 'fetching auction error!',
        hasErrored: true
      };
    case 'FETCHING_AUCTION':
      return {
        ...state,
        isFetching: true
      };
    case 'ONGOING_AUCTIONS_FETCHED':
      return {
        ...state,
        isFetching: false,
        fetchedOngoingAuctions: action.ongoingAuctions
      };
    case 'PASSED_AUCTIONS_FETCHED':
      return {
        ...state,
        isFetching: false,
        fetchedPassedAuctions: action.passedAuctions
    };
    default:
      return state;
  }
 };
 
 export default auctionsReducer; 