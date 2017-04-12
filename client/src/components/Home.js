import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as Artists from '../actions/artistActionCreator.jsx';
//only before frontend connects with backend
import { artworks } from '../../../server/database/dummyData.js';

console.log('artworks', artworks);
let MainArts = ({mainArts, history}) => {
  console.log('main arts: ', mainArts[0]);
  if (!mainArts[0]) {
    return <p>loading~~</p>
  } else {
    // console.log('id: ', mainArts[0].auction.id);
    return (
      <div>
        <img src="./assets/temp.png" />
        <span>art description</span>
        auctions
        {mainArts.map(mainArt => (
          <div key={mainArt.auction.id}>
            <img />
          </div>
          ))
        }
      </div>
    )
  }
}
//the images, when onClick, will lead to bidding page(filled with info for just this artwork).

let gotoAuction = (history, id, dispatch) => {
  dispatch(Auctions.fetchingAnAuction(true));
  // fetch('/??')
  // .then(response => {
  //   //got all the info for this auction
  dispatch(Auctions.fetchedAnAuction(artworks[0]));
  console.log(artworks[0]);
  // })
  history.push('/auction/' + id);
  
  //fetch info from backend for population
  // fetch('/??')
  // .then(response => {
  // })

  //redirect to another page (specific to this auction by id)
  // console.log('onclick props: ', this.props);

  // dispatch()
}
let HomeAuctions = ({homeAuctions, history, dispatch}) => {
  console.log('homeAuctions: ', homeAuctions);
  if (!homeAuctions[0]) {
    return <p>loading~~~</p>
  } else {
    let id = homeAuctions[0].auction.id;
    //do the mapping of img later:
    return (
      <div>
        <img src="./assets/logo.jpeg" onClick={() => {
          gotoAuction(history, id, dispatch);
        }}/>
        <img src="./assets/logo.jpeg" />
        <img src="./assets/logo.jpeg" />
        {homeAuctions.map(auction => {
          <img />
        })}
      </div>
    )
  }
}

let gotoArtist = (id, history, dispatch) => {
  dispatch(Artists.fetchingArtist(true));
  // fetch('/??')
  // .then(response => {
  //   //got all the info for this auction
  dispatch(Artists.fetchArtistSuccess(artworks[0]));
  console.log(artworks[0]);
  // })
  history.push('/artist/' + id);
  
  //fetch info from backend for population
  // fetch('/??')
  // .then(response => {
  // })

  //redirect to another page (specific to this auction by id)
  // console.log('onclick props: ', this.props);

  // dispatch()
}

let HomeArtists = ({homeArtists, history, dispatch}) => {
  return (
    <div>
      <img src="./assets/logo.jpeg" onClick={() => {
        gotoArtist(homeArtists, history, dispatch);
      }}/>
      <img src="./assets/logo.jpeg" />
      <img src="./assets/logo.jpeg" />
    </div>
  )
}

//need to pass down the arts from the database to MainArts component
//where to put fetch?

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    // Auctions.fetchAuctionData('/auctions');
      dispatch(Auctions.fetchingAuctions(true));
      //backend url for getting passed auctions?
      //will change the url to '/home' when the endpoint is ready
      fetch('/auctions')
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(Auctions.fetchingAuctions(false));
        console.log('hererererere');
        return response.json();
      })
      .then(data => {
        console.log('im data: ', data[0].auction);
        dispatch(Auctions.passedAuctionsFetchedSuccess(data));
        dispatch(Auctions.ongoingAuctionsFetchedSuccess(data));
        // dispatch(Artists.fetchArtistSuccess());

        //go fetch on going auctions and then go fetch artists.
        
      }
      ).catch(() => dispatch(Auctions.fetchAuctionErrored(true)));



    //want to dispatch fetchingAuctions(true)
    //and dispatch fetchAuctionData(url) to get passed
    //dispatch fecthAuctionData(url) to get ongoing
    //and dispatch fetchArtists()
    // this.fetchData('/auctions');//which url at the backend?
  }

    render() {
      console.log('this props: ', this.props);
      console.log('main arts::', this.props.mainArts);


      return (
        <div>
          <MainArts mainArts={this.props.mainArts} history={this.props.history} />
        <Divider />
        <p>---------------------------</p>
        <p>Auctions</p>
        <HomeAuctions homeAuctions={this.props.homeAuctions} history={this.props.history} dispatch={this.props.dispatch}/>
        <p>Artists</p>
        <Divider />
        <HomeArtists homeArtists={this.props.homeArtists} history={this.props.history} dispatch={this.props.dispatch} />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  //for production:
  return {
    mainArts: state.auctions.fetchedPassedAuctions,
    homeAuctions: state.auctions.fetchedOngoingAuctions,
    homeArtists: state.artists
  }

};

export default connect(mapStateToProps)(Home);
