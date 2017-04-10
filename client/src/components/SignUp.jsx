import React from 'react';

class SignUp extends React.Component {
  render() {
    return (
      <form>
      	Username:
      	<input type="text" placeholder="username" />
      	<br />
      	Password:
      	<input type="password" placeholder="password" />
      	<br />
      	Confirm password:
      	<input type="password" placeholder="password" />
      	<input type="submit" />
      </form>
    );
  }
}

export default SignUp;
