import React from 'react';

const Note = ({ notification, clickHandler, index}) => {
  const style = {
        fontWeight: !notification.read ? 'bold' : 'normal',
        color: !notification.read ? 'purple' : 'black'
      };
  if (!notification) {
    return <p>loading~~~~</p>
  } else {
    return (
      <div style={style} onClick={() => {!notification.read ? clickHandler(notification.id, index) : null}}>
        <span>{notification.text}</span>
        <span>{notification.date}</span>
        <span>{notification.read ? '' : ', unread'}</span>
      </div>
    )
  }
};
      // {notification.read ? <div> : <div onClick={() => {clickHandler(notification.id)}}>}

export default Note;
