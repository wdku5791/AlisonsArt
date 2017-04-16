import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

const CurrentAuctions = () => {
  return (
    <Container>
      current auctions
    </Container>
  );
}

const mapStateToProps = (states) => {
  return {

  }
}

export default connect(mapStateToProps)(CurrentAuctions);