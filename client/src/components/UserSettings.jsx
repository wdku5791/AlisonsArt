import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
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
    <span>
      <br />
      Current password:
      <input type="password" placeholder="current password" ref={node => currentPassword = node} />
      <br />
      New password:
      <input type="password" placeholder="new password" ref={node => newPassword = node} />
      <br />
      Confirm password:
      <input type="password" placeholder="confirm password" ref={node => confirmPassword = node} />
      <input type="submit" value="Submit" />
    </span>
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

  componentWillMount() {
    
  }

  _clickHandler(e) {
    e.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  _submitHandler(e) {
    e.preventDefault();
    let { userId } = this.props.user;
    fetch('/user/' + userId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      if (response.headers.get('x-username') && response.headers.get('x-userId')) {
        dispatch(UserActions.logInSuccess(response.headers.get('x-username'), response.headers.get('x-userId')));
      }

      return response.json();
    })
    .then(data => {
      if (currentPassword.value === data.password) {
        if (newPassword.value === confirmPassword.value) {
          fetch('/user/' + userId + '/changePassword', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
            }
          })
        } else {
          alert('Please enter the same password');
          _setInputsToNull();
        }
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
          <button onClick={(e) => {this._clickHandler(e)}}>Change password</button>
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