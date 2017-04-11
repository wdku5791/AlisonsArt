import React, { Component } from 'react';
class Auction extends Component {
  render(){
  // {this.props.params.auctionId}
  console.log(this.props.match.params.auctionId);
    return (
      <div>
       hellolooloo
        
      </div>
    )
  }
}

export default Auction;