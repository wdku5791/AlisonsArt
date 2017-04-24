export function logInSuccess(username, userId, bool) {
  return {
    type: 'LOG_IN_COMPLETE',
    username: username,
    userId: userId,
    artist: bool
  };
}

export function checkingInfo(bool) {
  return {
    type: 'CHECKING_LOG_IN',
    checking: bool
  };
}

export function logOut() {
  return {
    type: 'LOG_OUT_COMPLETE'
  };
}

export function loginError(err) {
  return {
    type: 'LOG_IN_ERROR',
    error: err
  };
}

export function fetchingSaveFollow(bool) {
  return {
    type: 'FETCHING_SAVE_FOLLOW',
    fetchingSF: bool
  };
}

export function fetchedSaves(saves) {
  return {
    type: 'FETCHED_SAVES',
    fetchedAuctions: saves
  };
}

export function fetchedFollows(follows) {
  return {
    type: 'FETCHED_FOLLOWS',
    fetchedFollows: follows
  };
}

