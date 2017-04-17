import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import * as UserAction from './../actions/userActionCreator.jsx';

class SignUp extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    let username = this.usernameNode.value;
    let password = this.passwordNode.value;
    let cPassword = this.cPasswordNode.value;
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
    } else {
      alert('please enter matching passwords!');
    }

  }

  render() {
    return (
      <div className='authForm'>
        <h3>Sign Up</h3>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input 
              placeholder='username' 
              ref={node => this.usernameNode = node} 
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input 
              type='password' 
              placeholder='password' 
              ref={node => this.passwordNode = node}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input 
              type='password' 
              placeholder='password' 
              ref={node => this.cPasswordNode = node}
            />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>First Name</label>
              <input 
                placeholder='first' 
                ref={node => this.firstNameNode = node} 
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input 
                placeholder='last' 
                ref={node => this.lastNameNode = node} 
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Email</label>
            <input 
              placeholder='example@example.com' 
              ref={node => this.emailNode = node} 
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input 
              placeholder='address' 
              ref={node => this.streetNode = node} 
            />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>City</label>
              <input 
                placeholder='city' 
                ref={node => this.cityNode = node} 
              />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <input 
                placeholder='state'
                ref={node => this.stateNode = node} 
              />
            </Form.Field>
          </Form.Group>
          <Button 
            type='submit' 
            onClick={e => {this._handleSubmit(e)}}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(SignUp);
