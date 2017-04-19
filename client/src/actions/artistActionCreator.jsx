export function fetchArtistErrored (bool, error) {
  return {
    type: 'FETCH_ARTIST_ERROR',
    fetchArtistErrored: bool,
    fetchArtistError: error
  };
}

export function fetchingArtist (bool) {
  return {
    type: 'FETCHING_ARTIST',
    isFetching: bool
  };
}

export function fetchArtistSuccess(artist) {
  return {
    type: 'FETCHED_ARTIST',
    fetchedArtist: artist
  };
}
