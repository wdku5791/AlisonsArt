import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';


//when login success, needs to save info in userReducer
class LogIn extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    let username = this.usernameNode.value;
    let password = this.passwordNode.value;
    this.usernameNode.value = '';
    this.passwordNode.value = '';
  //login request:
   
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
        console.log('response:', response);
        if(response.status === 201) {
          console.log('yeah');
          //dispatch an action to write to users. and make NavBar re-rendre:
          console.log('dispatch: ', this.props.dispatch);
          this.props.dispatch()
        } else {
          console.log('no~~');
        }
      }).catch(err => {
        console.log('err: ', err);
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
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LogIn);