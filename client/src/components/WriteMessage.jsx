import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, TextArea} from 'semantic-ui-react';

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
  }

  handleFormChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleFormSubmit() {
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

  componentWillMount() {
    this.retrieveMessages()
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
  }
}

export default connect(mapStateToProps)(WriteMessage)

