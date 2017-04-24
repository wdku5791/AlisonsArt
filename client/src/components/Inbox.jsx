import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import * as ChatActions from './../actions/chatActionCreator.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: []
    }
    this.getInbox = this.getInbox.bind(this);
    this.renderChatRoom = this.renderChatRoom.bind(this);
  }

  getInbox() {
    console.log('getInbox, userId: ', this.props.userId);
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
      let { dispatch } = this.props;
      dispatch(ChatActions.getInbox(data));
    })
    .catch((error) => {
      console.log('getInbox FAILED! error: ', error);
    })
  }

  renderChatRoom(e) {
    let receiverId = e.target.value;
    let roomname;
    if (this.props.userId > receiverId) {
      roomname = this.props.userId + receiverId;
    } else {
      roomname = receiverId + this.props.userId;
    }
    console.log('receiverId: ', receiverId, '\nroomname: ', roomname);
    fetch(`/messages/${this.props.userId}/?receiver_id=${receiverId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error('failed to retrieve messages...')
      }
      return response.json();
    })
    .then((data) => {
      let { dispatch } = this.props;
      dispatch(ChatActions.initRoom(receiverId, data, roomname));
    })
    .catch((error) => {
      console.log('retrieveMessages failed! error: ', error);
    })
  }

  componentDidMount() {
    this.getInbox();
  }

  render() {
    return (
      <Segment>
        <h3>INBOX</h3>
        <ul>
          {
            this.props.inboxMessages.map(conversation => {
              if ((this.state.loaded.indexOf(conversation.sender_id)) === -1 || (this.state.loaded.indexOf(conversation.receiver_id)) === -1) {
                if (this.props.userId === conversation.sender_id) {
                  this.state.loaded = this.state.loaded.slice().concat(conversation.receiver_id);
                  console.log('this.state.loaded: ', this.state.loaded);
                  return (
                    <li value={conversation.receiver_id} onClick={this.renderChatRoom}>
                      <strong>With: {conversation.receiver_id}</strong> "{conversation.text}" <strong>at: {conversation.message_date}</strong>
                    </li>
                  )
                } else {
                  this.state.loaded = this.state.loaded.slice().concat(conversation.sender_id);
                  console.log('this.state.loaded: ', this.state.loaded);
                  return (
                    <li value={conversation.sender_id} onClick={this.renderChatRoom}>
                      <strong>With: {conversation.receiver_id}</strong> "{conversation.text}" <strong>at: {conversation.message_date}</strong>
                    </li>
                  )
                }
              }
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
