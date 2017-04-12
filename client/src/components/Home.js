import React, { Component } from 'react';
import { Image, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as Artists from '../actions/artistActionCreator.jsx';


const clickMainArt = (artId, history) => {
  history.push('/auction/' + artId);
};

//render the description ... as floating right of the image
//closed auctions should be rendered differently from the ongoing ones
let MainArt = ({art, history}) => {
  return (
    <span>
    <Image className="ui image" src={art.artwork.image_url} onClick={() => {
      clickMainArt(art.artwork.id, history);
    }} />
    <span>Artist: {art.first_name} {art.last_name}</span>
    <span> Description: {art.artwork.description}</span>
    <span> Year: {art.artwork.age}</span>
    <span> Closing price: missing!!!!</span>
    </span>
  );
}

let MainArts = ({mainArts, history}) => {
  console.log('mainarts: ', mainArts);
  if (!mainArts[0]) {
    return <p>loading~~</p>
  } else {
    // this className in div is not working:
    return (
      <div className="ui small images">
       {mainArts.map(mainArt => <MainArt key={mainArt.id} art={mainArt} history={history}/>)}
      </div>
    )
  }
}
//the images, when onClick, will lead to bidding page(filled with info for just this artwork).

let gotoAuction = (history, id, dispatch) => {
  dispatch(Auctions.fetchingAnAuction(true));
  // fetch('/home')
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

let HomeAuction = ({homeAuction, history}) => {
  console.log('homeAuctions: ', homeAuction);
  return (
    <div>
      <Image src={homeAuction.artwork.image_url} />
      <span>Name: {homeAuction.artwork.art_name}</span>
    </div>
  );
}
//not using dispatch for the moment
let HomeAuctions = ({homeAuctions, history, dispatch}) => {
  if (!homeAuctions[0]) {
    return <p>loading~~~</p>
  } else {
    return (
      <div className="ui tiny images">
       {homeAuctions.map(homeAuction => <HomeAuction key={homeAuction.artwork.id} homeAuction={homeAuction} history={history} />)}
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

      fetch('/home')
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(Auctions.fetchingAuctions(false));
        console.log('hererererere');
        return response.json();
      })
      .then(data => {
        console.log('im data: ', data);
        let {current, expired, featuredArt} = data;
        dispatch(Auctions.passedAuctionsFetchedSuccess(expired));
        dispatch(Auctions.ongoingAuctionsFetchedSuccess(current));
        dispatch(Auctions.featuredArtsFetchedSuccess(featuredArt));
      })
      .catch(() => dispatch(Auctions.fetchAuctionErrored(true)));
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
  //currently because there are no passed auctions, replaced
  // mainArts: state.auctions.fetchedPassedAuctions in here. but change it back should make things work fine later.
  return {
    mainArts: state.auctions.fetchedOngoingAuctions,
    homeAuctions: state.auctions.fetchedOngoingAuctions,
    homeArtists: state.auctions.fetchedFeaturedArts
  }
};

export default connect(mapStateToProps)(Home);
