const initialState = {
  username: '',
  userId: null,
  userEmail: '',
  artist: false,
  checkingInfo: false,
  error: null,
  loggedOut: true,
  fetchingSF: false,
  savedAuctions: [],
  followingArtists: []
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHECKING_LOG_IN':
      return {
        ...state,
        checkingInfo: action.checking,
        error: null
      };
    case 'LOG_IN_COMPLETE':
      return {
        ...state,
        username: action.username,
        userId: action.userId,
        userEmail: action.userEmail,
        artist: action.artist,
        loggedOut: false
      };
    case 'LOG_IN_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'LOG_OUT_COMPLETE':
      return {
        ...state,
        ...initialState
      };
    case 'FETCHING_SAVE_FOLLOW':
      return {
        ...state,
        fetchingSF: action.fetchingSF
      };
    case 'FETCHED_SAVES':
      return {
        ...state,
        savedAuctions: action.fetchedAuctions
      }
    case 'FETCHED_FOLLOWS':
      return {
        ...state,
        followingArtists: action.fetchedFollows
      }
    default:
      return state;
  }
}

export default userReducer;
