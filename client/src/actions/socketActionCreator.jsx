export function sendMessage(message) {
  return {
    type: 'MESSAGE',
    data: message
  };
}

export function bidSurpassed(message) {
  return {
    type: 'BID_PASSED',
    data: message
  };
}

export function loginSocket(userId) {
  console.log('action called', userId);
  return {
    type: 'socket/LOGIN',
    data: userId
  };
}

export function logoutSocket(userId) {
  return {
    type: 'socket/LOGOUT',
    data: userId
  };
}
