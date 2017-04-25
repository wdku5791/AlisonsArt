export function chatMessage(message) {
  return {
    type: 'socket/CHAT_MESSAGE',
    data: message
  };
}

export function grabReceiverId(receiverId) {
  return {
    type: 'GETTING_RECEIVER_ID',
    data: receiverId
  }
}

export function initRoom(receiverId, messages, roomname) {
  return {
    type: 'socket/INITIALIZE_ROOM',
    data: [receiverId, messages, roomname]
  }
}

export function getInbox(messages) {
  return {
    type: 'GET_INBOX',
    data: messages
  }
}

export function clearChat() {
  return {
    type: 'CLEAR_CHAT'
  }
}

export function minimizeWindow() {
  return {
    type: 'MINIMIZE_CHAT'
  }
}
