import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.getInbox = this.getInbox.bind(this);
  }

  getInbox() {
    fetch(`/messages/inbox/${this.props.userId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error('failed to retrieve inbox messages...')
      }
      return response.json()
    })
    .then((data) => {
      console.log('inbox SUCCESS! data: ', data);
    })
    .catch((error) => {
      console.log('getInbox FAILED! error: ', error);
    })
  }

  componentWillMount() {
    this.getInbox();
  }

  render() {
    return (
      <Segment>
        <h3>INBOX</h3>
        <ul>
          {
            this.props.inboxMessages.map(conversation => {
              return (
                <li>a conversation should be here between 2 users</li>
              )
            })
          }
        </ul>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    inboxMessages: state.chat.inboxMessages,
  }
}

export default connect(mapStateToProps)(Inbox)
