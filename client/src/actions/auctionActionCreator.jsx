export function fetchAuctionErrored (bool) {
  return {
    type: 'FETCH_AUCTION_ERROR',
    hasErrored: bool
  };
}

export function fetchingAuction(bool){
  return {
    type: 'FETCHING_AUCTION',
    isLoading: bool
  };
}

export function ongoingAuctionFetchedSuccess(auctions) {
  return {
    type: 'ONGOING_AUCTIONS_FETCHED',
    ongoingAuctions
  };
}

export function passedAuctionFetchedSuccess(auctions) {
  return {
    type: 'PASSED_AUCTIONS_FETCHED',
    passedAuctions
  };
}

export function fetchAuctionData(url) {
  return (dispatch) => {
    dispatch(fetchingAuction(true));

    fetch(url)
    .then((response) => {
      if(!reponse.ok) {
        throw Error(reponse.statusText);
      }
      dispatch(fetchingAuction(false));

      return response;
    })
    .then(response => response.json())
    .then(auctionData => dispatch(auctionFetchedSuccess(auctionData)))
    .catch(() => dispatch(fetchAuctionErrored(true)));
  };
}





















