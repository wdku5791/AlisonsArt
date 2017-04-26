import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Segment, Button, TextArea} from 'semantic-ui-react';
import * as ChatActions from './../actions/chatActionCreator.jsx';

class WriteMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.retrieveMessages = this.retrieveMessages.bind(this);
  }

  handleFormChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleFormSubmit() {
    var messagePayload = {
      text: this.state.text,
      sender_id: this.props.userId,
      receiver_id: this.props.receiverId,
      roomname: this.props.roomname,
    }
    this.setState({
      text: '',
    })
    fetch(`/messages/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(messagePayload)
    })
    .then((response) => {
      if (!response.ok) {
        throw Error('message failed to send...');
      }
      return response.json();
    })
    .then((data) => {
      let {dispatch} = this.props;
      dispatch(ChatActions.chatMessage(messagePayload));
    })
    .catch((error) => {
      //this can dispatch an error to the reducer and when the fronend detects error, render something differently
      console.log('handleFormSubmit failed! Error: ', error);
    });
  }

  // retrieveMessages() {
  //   fetch(`/messages/${this.props.userId}/?receiver_id=${this.props.receiverId}`, {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
  //     })
  //   })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw Error('failed to retrieve messages...')
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log('messages retrieved! data: ', data);
  //   })
  //   .catch((error) => {
  //     console.log('retrieveMessages failed! error: ', error);
  //   })
  // }

  // componentDidMount() {
  //   setTimeout(this.retrieveMessages, 1500);
  // }  

  render() {
    return (
      <Segment className='messageWindow'>
        <p><strong>conversation with: {this.props.receiverId}</strong></p>
        <Segment className='messageFeed'>
          {
            this.props.messages.map(message => {
              if (Number(message.sender_id) === Number(this.props.userId)) {
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
    receiverId: state.chat.receiverId,
    messages: state.chat.messages,
    roomname: state.chat.roomname,
  }
}

export default connect(mapStateToProps)(WriteMessage)

