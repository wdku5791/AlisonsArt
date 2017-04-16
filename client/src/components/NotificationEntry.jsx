import React from 'react';

const Note = ({ notification, clickHandler, index}) => {
  if (!notification) {
    return <p>loading~~~~</p>
  } else {
    return (
      <div onClick={() => {if (notification.read === false) {clickHandler(notification.id, index)}}}>
        <span>{notification.id}</span>
        <span>{notification.text}</span>
        <span>{notification.date}</span>
      </div>
    )
  }
};
      // {notification.read ? <div> : <div onClick={() => {clickHandler(notification.id)}}>}

export default Note;