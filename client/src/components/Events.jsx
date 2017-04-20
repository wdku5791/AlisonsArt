import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from './../actions/userActionCreator.jsx';

class Events extends Component {
  componentWillMount() {
    //add request to backend here
  }

  render(){
    return(
      <div>
        we have the following events:
      </div>
    )
  }
}

export default connect()(Events);
