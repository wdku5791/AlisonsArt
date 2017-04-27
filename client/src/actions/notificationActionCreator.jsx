export function fetchNotifications(bool) {
  return {
    type: 'FETCHING_NOTIFICATIONS',
    fetchingNoties: bool
  };
}

export function fetchError(bool) {
  return {
    type: 'FETCH_ERROR',
    error: bool
  };
}

export function fetchSuccess(notifications) {
  return {
    type: 'FETCH_COMPLETE',
    notifications
  };
}

export function updater(notifications) {
  return {
    type: 'UPDATE',
    notifications
  };
}
