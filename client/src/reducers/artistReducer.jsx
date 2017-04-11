const initialState = {
  isFetching: false,
  fetchedArtists: [],
  fetchArtistError: null
};

const artistReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ARTISTS_ERROR':
      return {
        ...state,
        isFetching: false,
        fetchArtistError: 'fetching artists error!'
      };
    case 'FETCHING_ARTISTS':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCHED_ARTISTS':
      return {
        ...state,
        isFetching: false,
        fetchedArtists: action.artists
      };
    default:
      return state;
  }
}

export default artistReducer;