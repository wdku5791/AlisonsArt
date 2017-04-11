import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';

//presentational component:
let MainArts = ({auctions}) => {
  console.log('mainart props: ', auctions);
  // let {dispatch} = this.props
  // dispatch(Auctions.fetchingAuction(true));
  return (
    <div>
      <img src="./assets/temp.png" />
      <span> art description</span>
      auctions
      {auctions.map(auction => (
        <div>
          <img />
        </div>
        ))
      }
    </div>
  )
}

let HomeAuctions = ({auctions}) => {
  return (
    <div>
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
      {auctions.map(auction => {
        <img />
      })}
    </div>
  )
}

let HomeArtists = () => {
  return (
    <div>
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
    </div>
  )
}

const mapStateToMainArtsProps = (state) => {
  return {
    auctions: state.auctions.fetchedPassedAuctions
  }
}

const mapDispatchToMainArtsProps = (dispatch) => {

}
//how to fetch new auctions while the mainarts fetch past auctions?
const mapStateToHomeAuctions = (state) => {
  console.log("state.auctions.fetchedOngoingAuctions: ", state.auctions.fetchedOngoingAuctions)
  return {
    auctions: state.auctions.fetchedOngoingAuctions

  }
}

const mapStateToHomeArtists = (state) => {
  console.log(state);
  return {
    artists: state
  }
}

//need to pass down the arts from the database to MainArts component
//where to put fetch?


class Home extends Component {

  // fetchData(url) {
  //   fetch(url)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw Error(response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then(res => {
  //     //res is available here:
  //     //dispatch actions to update auctions
  //     console.log('res: ', res);
  //     // console.log('store: ', store);//this will error out
  //   })
  //   .catch(() => {
  //     //dispatch errors on updating auctions
  //     console.log('errored out');
  //   })
  // }

  componentWillMount() {
    console.log('this.props: ', this.props);
    // this.fetchData('/auctions');//which url at the backend?
  }

    // console.log('store: ', store);
    render() {
      return (
        <div>
          <MainArts />
        <Divider />
        <p>---------------------------</p>
        <p>Auctions</p>
        <HomeAuctions />
        <p>Artists</p>
        <Divider />
        <HomeArtists />
        </div>
      )
    }
}
//connect's second function call takes presentational component
// as argument
MainArts = connect(mapStateToMainArtsProps, null)(MainArts);
HomeAuctions = connect(mapStateToHomeAuctions, null)(HomeAuctions);
HomeArtists = connect(mapStateToHomeArtists, null)(HomeArtists);

export default Home;
