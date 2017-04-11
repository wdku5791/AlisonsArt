import React, { Component } from 'react';
class Auction extends Component {

  componentWillMount() {
    //fetch data here
    //dispatch fetch data by Id
    //id of this auction is saved at: this.props.match.params.auctionId
  }
  // add button onClick={}
  render(){
  console.log(this.props.match.params.auctionId);
    return (
      <div>
       hellolooloo
        <img/>
        <p>description floating right of the image</p>
        <button >Bid now</button>
      </div>
    )
  }
}

export default Auction;