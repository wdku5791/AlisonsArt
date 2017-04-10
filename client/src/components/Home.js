import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';


//presentational component:
const MainArts = () => {
  console.log('haha"');

  return (
    <div>
      <img src="./assets/temp.png" />
      <span> art description</span>
    </div>
  )
}

const HomeAuctions = () => {
  return (
    <div>
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
    </div>
  )
}

const HomeArtists = () => {
  return (
    <div>
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    hey: "hello"
  }
}

const mapDispatchToProps = (dispatch) => {

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

  // componentWillMount() {
  //   this.fetchData('/auctions');//which url at the backend?
  // }

  render() {
    // console.log('store: ', store);
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
connect(mapStateToProps)(MainArts);

export default Home;
