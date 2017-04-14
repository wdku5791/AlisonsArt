import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as UserAction from './../actions/userActionCreator.jsx';

class SignUp extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    let username = this.usernameNode.value;
    let password = this.passwordNode.value;
    let cPassword = this.passwordNode.value;
    let email = this.emailNode.value;
    let lastName = this.emailNode.value;
    let firstName = this.emailNode.value;
    let address = this.streetNode.value + ', ' + this.cityNode.value + ', ' + this.stateNode.value;

    this.usernameNode.value = '';
    this.passwordNode.value = '';
    this.cPasswordNode.value = '';
    this.emailNode.value = '';
    
    let { dispatch } = this.props;

    if (password === cPassword) {
      fetch('/auth/signup', {
        //don't forget the headers, otherwise it won't work
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          username: username, 
          password: password,
          email: email,
          address: address,
          first_name: firstName,
          last_name: lastName,
          type: 'user'
        })
      }).then(response => {
        dispatch(UserAction.checkingInfo(true));
        if(!response.ok) {
          throw Error('sign in post not ok!');
        }
        return response.json();
      }).then(data => {
        dispatch(UserAction.checkingInfo(false));
        dispatch(UserAction.logInSuccess(data.username, data.userId));
        //push user to Homepage:
        this.props.history.push('/home');
        this.streetNode.value = '';
        this.cityNode.value = '';
        this.stateNode.value = '';
        this.firstNameNode.value = '';
        this.lastNameNode.value = '';
      }).catch(err => {
        dispatch(UserAction.checkingInfo(false));
        dispatch(UserAction.loginError(err));
      });
    }

  }

  render() {
    return (
      <Container>
        <form onSubmit={e => {this._handleSubmit(e)}}>
        	Username:
        	<input type="text" placeholder="username" 
          ref={node => this.usernameNode = node} />
        	<br />
        	Password:
        	<input type="password" placeholder="password" 
          ref={node => this.passwordNode = node} />
        	<br />
        	Confirm password:
        	<input type="password" placeholder="password" 
          ref={node => this.cPasswordNode = node} />
          <br />
          Name:
          <input type="text" placeholder="first name" 
          ref={node => this.firstNameNode = node} />
          <input type="text" placeholder="last name" 
          ref={node => this.lastNameNode = node} />
          <br />
          Email:
          <input type="text" placeholder="email@example.com" 
          ref={node => this.emailNode = node} />
          <br />
          Address:
          <input type="text" placeholder="street" 
          ref={node => this.streetNode = node} />
          <input type="text" placeholder="city" 
          ref={node => this.cityNode = node} />
          <input type="text" placeholder="state" 
          ref={node => this.stateNode = node} />
        	<input type="submit" />
        </form>
      </Container>
    );
  }
}

export default connect()(SignUp);
