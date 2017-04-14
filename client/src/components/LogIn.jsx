import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as UserAction from './../actions/userActionCreator.jsx';


//when login success, needs to save info in userReducer
class LogIn extends Component {

  _handleSubmit(e) {
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
      <Container>
        <form onSubmit={e => {this._handleSubmit(e)}}>
          Username:
          <input type="text" placeholder="username" ref={node => this.usernameNode = node} />
          <br />
          Password:
          <input type="password" placeholder="password" ref={node => this.passwordNode = node}/>
          <input type="submit"/>
        </form>
      </Container>
    )
  }
}

export default connect()(LogIn);