import React from 'react';
import { connect } from 'react-redux';
import * as notifications from '../actions/notificationActionCreator.jsx';

class Notification extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    const {dispatch, userId} = this.props;
    console.log('myprops for notifications', this.props);
      dispatch(notifications.fetchNotifications(true));

      fetch('/notifications/' + userId) //TODO NEEED NEW PATH
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(notifications.fetchNotifications(false));
        dispatch(notifications.fetchError(false));
        return response.json();
      })
      .then(data => {
        dispatch(notifications.fetchSuccess(data.notifications));
      })
      .catch(() => dispatch(notifications.fetchError(true)));
  }

  render() {
    const { notifications } = this.props;
    return (
      <div>

        <div>
          <p>Notifications~~~</p>
        </div>
      </div>
    );
  }
}
        // {notifications.map(notification => (
        //   <div>
        //     <p>Notification!</p>
        //   </div>
        //   )
        // )}

const mapStateToProps = (state) => {
  return { 
    notifications: state.notifications,
    userId: state.user.userId
  };
};

export default connect(mapStateToProps)(Notification);
