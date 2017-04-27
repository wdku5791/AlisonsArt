import React from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  };
  render() {
    let { noty } = this.props;
    let time = moment(noty.date).fromNow();
    let elem;
    if (!noty) {
      elem = <p>loading~~~~</p>;
    } else {
      elem = (
          <Grid.Row verticalAlign='top' className={(noty.read ? 'noty' : 'read') + (this.state.expanded ? ' expanded' : '')}>
            <Grid.Column width={13} 
            className='shadowless'
            onClick={() => {this.setState({expanded: !this.state.expanded})}}
            textAlign='left'>
              {noty.text}
            </Grid.Column>
            <Grid.Column width={3} 
            className={noty.read ? 'shadowless' : 'shadowless cursorpointer'}
            onClick={() => {!noty.read ? this.props.clickHandler(noty.id, noty) : null}}
            textAlign='right'>
              { time }
              <div>{noty.read ? null : 'Unread'}</div>
            </Grid.Column>
          </Grid.Row>
      )
    }  
  return elem;
  }
};

export default Note;
