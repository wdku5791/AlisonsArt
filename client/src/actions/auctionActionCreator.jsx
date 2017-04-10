export function fetchAuctionErrored (bool) {
  return {
    type: 'FETCH_AUCTION_ERROR',
    hasErrored: bool
  };
}

export function fecthingAuction(bool){
  return {
    type: 'FETCHING_AUCTION',
    isLoading: bool
  };
}

export function auctionFetchedSuccess(auctions) {
  return {
    type: 'AUCTIONS_FETCHED',
    auctions
  };
}

export function fetchAuctionData(url) {
  return (dispatch) => {
    dispatch(fecthingAuction(true));

    fetch(url)
    .then((response) => {
      if(!reponse.ok) {
        throw Error(reponse.statusText);
      }
      dispatch(fecthingAuction(false));

      return response;
    })
    .then(response => response.json())
    .then(auctionData => dispatch(auctionFetchedSuccess(auctionData)))
    .catch(() => dispatch(fetchAuctionErrored(true)));
  };
}





















