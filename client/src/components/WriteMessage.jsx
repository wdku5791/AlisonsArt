import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Segment, Button, TextArea} from 'semantic-ui-react';
import io from 'socket.io-client';
import * as ChatActions from './../actions/chatActionCreator.jsx';

var socket = io();

class WriteMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sender_id: 4,
      receiver_id: 3,
      messages: [],
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.retrieveMessages = this.retrieveMessages.bind(this);
    this.appendMessage = this.appendMessage.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleFormSubmit() {
    var messagePayload = {
      text: this.state.text,
      sender_id: this.state.sender_id,
      receiver_id: this.state.receiver_id,
    }
    let {dispatch} = this.props;
    dispatch(ChatActions.chatMessage(messagePayload));
    this.setState({
      text: ''
    })
    fetch('/messages/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if (!response.ok) {
        throw Error('message failed to send...');
      }
      return response.json();
    })
    .then((data) => {
      console.log('message posted to DB! data: ', data);
      var clone = this.state.messages.slice(0);
      clone.push(this.props.chatMessage);
      this.setState({
        messages: clone
      })
    })
    .catch((error) => {
      console.log('handleFormSubmit failed! Error: ', error);
    })
  }

  retrieveMessages() {
    fetch(`/messages/${this.state.sender_id}?receiver_id=${this.state.receiver_id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error('failed to retrieve messages...')
      }
      return response.json();
    })
    .then((data) => {
      console.log('messages retrieved! data: ', data);
      this.setState({
        messages: data
      })
      console.log('this.state.messages: ', this.state.messages);
    })
    .catch((error) => {
      console.log('retrieveMessages failed! error: ', error);
    })
  }

  appendMessage(message) {
    console.log('message retrieved from server: ', message, '\nthis.state: ', this.state);
    var messageNode;
    if (message.sender_id === this.state.sender_id) {
      messageNode = <p className='senderMessage'>message.text</p>
    } else {
      messageNode = <p className='receiverMessage'>message.text</p>
    }
    console.log('messageNode: ', messageNode);
    React.findDOMNode().appendChild(messageNode);
    return;
  }

  componentWillMount() {
    this.retrieveMessages();
  }

  render() {
    return (
      <Segment className='messageWindow'>
        <p><strong>conversation with: {this.state.receiver_id}</strong></p>
        <Segment className='messageFeed'>
          {
            this.state.messages.map(message => {
              if (Number(message.sender_id) === this.state.sender_id) {
                return <p className='senderMessage'>{message.text}</p>
              } else {
                return <p className='receiverMessage'>{message.text}</p>
              }
            })
          }
        </Segment>
        <Segment className='messageInput'>
          <TextArea autoHeight 
            value={this.state.text}  
            onChange={this.handleFormChange}
          />
          <Button 
            onClick={this.handleFormSubmit}
          >
            Send
          </Button>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    userId: state.user.userId,
    chatMessage: state.chat.chatMessage,
  }
}

export default connect(mapStateToProps)(WriteMessage)

