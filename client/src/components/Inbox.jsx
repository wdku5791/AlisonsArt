import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import * as ChatActions from './../actions/chatActionCreator.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.getInbox = this.getInbox.bind(this);
    this.renderChatRoom = this.renderChatRoom.bind(this);
  }

  getInbox() {
    fetch(`/messages/inbox/${this.props.userId}/?username=${this.props.username}`, {
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
      let filteredInbox = {};
      for (var i = 0; i < data.length; i++) {
        var userId = this.props.userId;
        var senderId = data[i].sender_id;
        var receiverId = data[i].receiver_id;
        if (userId !== senderId && !filteredInbox[senderId]) {
          filteredInbox[senderId] = data[i];
        } else if (userId !== receiverId && !filteredInbox[receiverId]) {
          filteredInbox[receiverId] = data[i];
        }
      }
      var filteredArray = [];
      for (var key in filteredInbox) {
        filteredArray.push(filteredInbox[key]);
      }
      console.log('filteredArray: ', filteredArray);
      let { dispatch } = this.props;
      dispatch(ChatActions.getInbox(filteredArray));
    })
    .catch((error) => {
      console.log('getInbox FAILED! error: ', error);
    })
  }

  renderChatRoom(receiverId, fullName) {
    let roomname;
    if (this.props.userId > receiverId) {
      roomname = this.props.userId + receiverId;
    } else {
      roomname = receiverId + this.props.userId;
    }
    console.log('receiverId: ', receiverId, '\nfullName: ', fullName, '\nroomname: ', roomname);
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
      console.log('DATA FROM QUERY, INIT FROM INBOX: ', data);
      let { dispatch } = this.props;
      dispatch(ChatActions.initRoom(receiverId, data, roomname, fullName));
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
              let fullName = conversation.first_name + ' ' + conversation.last_name;
              let senderId = conversation.sender_id;
              let receiverId = conversation.receiver_id;
              // console.log('conversation fullName: ', fullName);
              if (this.props.userId !== conversation.sender_id) {
                return (
                  <li value={conversation.sender_id} name={fullName} onClick={() => this.renderChatRoom(senderId, fullName)}>
                    <strong>{conversation.first_name} {conversation.last_name} </strong>"{conversation.text}"<strong> at: {conversation.message_date}</strong>
                  </li>
                )
              } else {
                return (
                  <li value={conversation.receiver_id} name={fullName} onClick={() => this.renderChatRoom(receiverId, fullName)}>
                    <strong>{conversation.first_name} {conversation.last_name} </strong>"{conversation.text}"<strong> at: {conversation.message_date}</strong>
                  </li>
                )
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
    username: state.user.username,
    inboxMessages: state.chat.inboxMessages,
  }
}

export default connect(mapStateToProps)(Inbox)
