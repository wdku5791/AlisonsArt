import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import * as UserAction from './../actions/userActionCreator.jsx';


//when login success, needs to save info in userReducer
class LogIn extends Component {

  _handleSubmit(e) {
    console.log('_handleSubmit is running!');
    e.preventDefault();
    let username = this.usernameNode.value;
    let password = this.passwordNode.value;
    this.usernameNode.value = '';
    this.passwordNode.value = '';
    let { dispatch } = this.props;

    fetch('/auth/login', {
      //don't forget the headers, otherwise it won't work
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: username, 
        password: password
      })
    }).then(response => {
      dispatch(UserAction.checkingInfo(true));
      if(!response.ok) {
        throw Error('Log in post not ok!');
      }
      return response.json();
    }).then(data => {
      dispatch(UserAction.checkingInfo(false));
      dispatch(UserAction.logInSuccess(data.username, data.userId));
      //push user to Homepage:
      this.props.history.push('/home');
    }).catch(err => {
      dispatch(UserAction.checkingInfo(false));
      dispatch(UserAction.loginError(err));
    });
  }  

  render(){
    return(
      <div className='authForm'>
        <h3>Login</h3>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input placeholder='username' ref={node => this.usernameNode = node} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' placeholder='password' ref={node => this.passwordNode = node}/>
          </Form.Field>
          <Button type='submit' onClick={e => {this._handleSubmit(e)}}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default connect()(LogIn);