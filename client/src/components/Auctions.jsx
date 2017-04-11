import React from 'react';

import { connect } from 'react-redux';

class Auctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const { auctions } = this.props;
    console.log(auctions);
    return (
      <div>
        {auctions.map(auction => (
          <div>
            <p>{auction.artwork_id}</p>
          </div>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auctions: state.auctions };
};

export default connect(mapStateToProps)(Auctions);
