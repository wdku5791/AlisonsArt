import React, { Component } from 'react';
import { Container, Image, Button, Input, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';

let currentPassword = null;
let newPassword = null;
let confirmPassword = null;

const _setInputsToNull = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
};

const ChangePassword = () => {
  return (
    <Segment>
      <br />
      Current password:
      <Input type="password" placeholder="current password" ref={node => currentPassword = node} />
      <br />
      New password:
      <Input type="password" placeholder="new password" ref={node => newPassword = node} />
      <br />
      Confirm password:
      <Input type="password" placeholder="confirm password" ref={node => confirmPassword = node} />
      <Input type="submit" value="Submit" />
    </Segment>
  );
}

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _clickHandler(e) {
    e.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  _submitHandler(e) {
    e.preventDefault();
    let { userId } = this.props.user;
    fetch(`/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      if (currentPassword.value === data.password) {
        if (newPassword.value === confirmPassword.value) {
          fetch(`/user/${userId}/changePassword`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            },
            method: 'POST',
            body: JSON.stringify({
              userId: userId,
              password: newPassword.value
            })
          })
          .then(response => {
            if (!response.ok) {
              throw Error('error');
            } else {
              alert('Successfully changed password');
              _setInputsToNull();
              this.setState({toggle: !this.state.toggle});
            }
          })
        } else {
          alert('Please enter the same password');
          _setInputsToNull();
        }
      } else {
        alert('You entered the wrong current password');
        _setInputsToNull();
      }
    })
    .catch(err => {
      alert('Error: change password failed!');
       _setInputsToNull();
    });
  }

  render(){
    let { username } = this.props.user;
    if(username) {
      return(
        <Container>
          <form onSubmit={(e) => {this._submitHandler(e)}}>
          Username: {username}
          <br />
          Email:
          <br />
          Phone number: xxxxxxx
          <br />
          <Button onClick={(e) => {this._clickHandler(e)}} content="Change password" />
          {this.state.toggle? <ChangePassword /> : null}
          </form>
        </Container>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(UserSettings);