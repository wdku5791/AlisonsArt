export function fetchNotifications(bool) {
  return {
    type: 'FETCHING',
    bool
  };
}

export function fetchError(bool) {
  return {
    type: 'FETCH_ERROR',
    bool
  };
}

export function fetchSuccess(notifications) {
  return {
    type: 'FETCH_COMPLETE',
    notifications
  };
}

