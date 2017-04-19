const initialState = {
  isFetching: false,
  fetchedArtist: {},
  // fetchedArtists: [],
  fetchArtistError: null,
  fetchArtistErrored: false
};

const artistReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ARTIST_ERROR':
      return {
        ...state,
        fetchArtistErrored: action.fetchArtistErrored,
        fetchArtistError: action.fetchArtistError
      };
    case 'FETCHING_ARTIST':
      return {
        ...state,
        isFetching: action.isFetching
      };
    case 'FETCHED_ARTIST':
      return {
        ...state,
        fetchedArtist: action.fetchedArtist
      };
    default:
      return state;
  }
}

export default artistReducer;