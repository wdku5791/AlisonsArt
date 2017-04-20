export function joinRoom(roomname) {
  return {
    type: 'socket/JOIN_ROOM',
    data: roomname
  }
}

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

export function getChatLog(receiverId, message) {
  return {
    type: 'GETTING_CHAT_LOG',
    data: [receiverId, message]
  }
}
