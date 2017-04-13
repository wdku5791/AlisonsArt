import React, { Component } from 'react';
import { connect } from 'react-redux';


//when login success, needs to save info in userReducer
class LogIn extends Component {

  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.usernameNode.value);
    console.log(this.passwordNode.value);
    this.usernameNode.value = '';
    this.passwordNode.value = '';

    fetch()
  }  

  render(){
    return(
      <form onSubmit={e => {this._handleSubmit(e)}}>
        Username:
        <input type="text" placeholder="username" ref={node => this.usernameNode = node} />
        <br />
        Password:
        <input type="password" placeholder="password" ref={node => this.passwordNode = node}/>
        <input type="submit"/>
      </form>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(LogIn);