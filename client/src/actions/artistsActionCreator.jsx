//this creator hasn't been finished yet

export function fetchedArtistsSuccess(artists) {
  return {
    type: 'FETCHED_ARTISTS',
    fetchedArtists: artists
  };
}
