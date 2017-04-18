export function userAuctionsErrored(error) {
  return {
    type: 'USER_AUCTION_ERROR',
    hasErrored: true,
    fetchAuctionsError: error
  };
}

export function fetchingUserAuctions(bool) {
  return {
    type: 'FETCHING_USER_AUCTION',
    isFetching: bool
  };
}

export function userAuctionsFetched(userAuctions) {
  return {
    type: 'USER_AUCTIONS_FETCHED',
    userAuctions
  };
}
