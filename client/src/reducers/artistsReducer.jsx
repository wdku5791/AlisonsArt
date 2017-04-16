//this reducer is not added to the store yet
const initialState = {
  isFetching: false,
  fetchedArtists: [],
  fetchArtistsError: null,
  fetchArtistsErrored: false
};

const artistsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ARTISTS_ERROR':
      return {
        ...state,
        fetchArtistsErrored: action.fetchArtistErrored,
        fetchArtistsError: action.fetchArtistError
      };
    case 'FETCHING_ARTISTS':
      return {
        ...state,
        isFetching: action.isFetching
      };
    case 'FETCHED_ARTISTS':
      return {
        ...state,
        fetchedArtists: action.artists
      };
  }
}


export default artistsReducer;
