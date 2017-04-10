import React from 'react';

class LogIn extends React.Component {
  render(){
    return(
      <form>
        Username:
        <input type="text" placeholder="username" />
        <br />
        Password:
        <input type="password" placeholder="password" />
        <input type="submit" />
      </form>
    )
  }
}

export default LogIn;