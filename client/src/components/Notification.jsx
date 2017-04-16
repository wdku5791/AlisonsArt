import React from 'react';
import { connect } from 'react-redux';
import * as notifications from '../actions/notificationActionCreator.jsx';
import Note from './NotificationEntry.jsx';

class Notification extends React.Component {
  constructor(props) {
    super(props);
  };


  componentWillMount() {
    const {dispatch, userId} = this.props;
    console.log('myprops for notifications', this.props);
    dispatch(notifications.fetchNotifications(true));

    fetch(`/notifications/${userId}`)
    .then(response => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(notifications.fetchNotifications(false));
      dispatch(notifications.fetchError(false));
      return response.json();
    })
    .then(data => {
      dispatch(notifications.fetchSuccess(data));
    })
    .catch(() => dispatch(notifications.fetchError(true)));
  };

  clickHandler(notificationId, index) {
    const {dispatch, userId, notification} = this.props;
    let notes = notification.notifications;
    console.log(notes[index]);
    let temp = {...notes[index], 'read': true}

    let newNotification = notes.slice(0, index).concat([temp]).concat(notes.slice(index + 1));
    console.log('notifications', notes, newNotification);
    dispatch(notifications.updater(newNotification));

    dispatch(notifications.fetchNotifications(true));
    fetch(`/notifications/${userId}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ id: notificationId })
    })
    .then(data => {
      dispatch(notifications.fetchNotifications(false));
      dispatch(notifications.fetchError(false));
    })
    .catch(() => dispatch(notifications.fetchError(true)));
  };

  render() {
    const { notification } = this.props;
    return (
      <div>
        <div>
          <p>Notifications~~~</p>
        </div>
        <div>
          {notification.notifications.map((notification, index) => (
            <Note key={notification.id}
            index={index}
            clickHandler={this.clickHandler.bind(this)}
            notification={notification} />)
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    notification: state.notifications,
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Notification);
