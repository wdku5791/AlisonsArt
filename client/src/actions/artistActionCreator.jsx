export function fetchArtistErrored (bool, error) {
  return {
    type: 'FETCH_ARTIST_ERROR',
    fetchArtistError: bool,
    fetchArtistError: error
  };
}

export function fetchingArtist (bool) {
  return {
    type: 'FETCHING_ARTISTS',
    isFetching: bool
  };
}

export function fetchArtistSuccess(artists) {
  return {
    type: 'FETCHED_ARTISTS',
    fetchedArtists: artists
  };
}