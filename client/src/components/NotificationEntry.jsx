import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import moment from 'moment';
import tz from 'moment-timezone';

const Note = ({ notification, clickHandler, index}) => {
  const style = {
        fontWeight: !notification.read ? 'bold' : 'normal',
        color: !notification.read ? 'purple' : 'black'
      };
  if (!notification) {
    return <p>loading~~~~</p>
  } else {
    let time = moment.utc(notification.date).fromNow();

    return (
        
        <Grid.Row verticalAlign='top' className={notification.read ? 'noty rowu' : 'read rowu'}>
          <Grid.Column width={12} className='noty' textAlign='left'>
            {notification.text}
          </Grid.Column>
          <Grid.Column width={4} 
          onClick={() => {!notification.read ? clickHandler(notification.id, index) : null}}
          textAlign='right'>
            { time }
          </Grid.Column>
        </Grid.Row>
    )
  }
};

// <List.Item className={notification.read ? '' : 'read'}>
//   <List.Content verticalAlign="bottom" floated="right" 
//   onClick={() => {!notification.read ? clickHandler(notification.id, index) : null}}>
//     {notification.read ? '' : 'unread'}
//   </List.Content>
//   <List.Content>
//     <List.Header>{notification.date}</List.Header>
//     {notification.text}
//   </List.Content>
// </List.Item>

export default Note;
