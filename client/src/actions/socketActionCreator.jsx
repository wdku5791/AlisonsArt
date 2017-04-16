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
