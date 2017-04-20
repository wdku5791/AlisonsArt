import React from 'react';
import { connect } from 'react-redux';
import { Segment, Input, Button } from 'semantic-ui-react';

class WriteMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'this is a test message from bryan to anthony',
      sender_id: 4,
      receiver_id: 3,
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  render() {
    return (
      <Segment className='messageBar'>
        <Input 
          value={this.state.text}  
          onChange={this.handleFormChange}
        />
        <Button 
          onClick={this.handleFormSubmit}
        >
          Send
        </Button>
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

