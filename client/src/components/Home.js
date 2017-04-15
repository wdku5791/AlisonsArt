import React, { Component } from 'react';
import { Image, Divider, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as Artists from '../actions/artistActionCreator.jsx';


const clickArt = (artId, history) => {
  history.push('/auction/' + artId);
};

//render the description ... as floating right of the image
//closed auctions should be rendered differently from the ongoing ones
const MainArt = ({ art, history }) => {
  console.log('heyhey:' , art.first_name);
  return (
    <span>
      <Image className="ui image" src={art.artwork.image_url} onClick={() => {
        clickArt(art.artwork.id, history);
      }} />
      <span className="ui label">
        <span>Artist: {art.first_name} {art.last_name}</span>
        <br />
        <span> Description: {art.artwork.description}</span>
        <br />
        <span> Year: {art.artwork.age}</span>
        <br />
        <span> Closing price: missing!!!!</span>
      </span>
    </span>
  );
}

const MainArts = ({ mainArts, history }) => {
  if (!mainArts[0]) {
    return <p>loading~~</p>
  } else {
    // this className in div is not working:
    return (
      <Container className="ui small images">
       {mainArts.map(mainArt => <MainArt key={mainArt.id} art={mainArt} history={history}/>)}
      </Container>
    )
  }
}
//the images, when onClick, will lead to bidding page(filled with info for just this artwork).

const HomeAuction = ({ homeAuction, history }) => {
  return (
    <span>
      <Image src={homeAuction.artwork.image_url} onClick={() => {
        clickArt(homeAuction.artwork.id, history);
      }} />
      <span className="ui label">
        <span>Name: {homeAuction.artwork.art_name}</span>
        <span> Id: {homeAuction.id}</span>
      </span>
    </span>
  );
}
//not using dispatch for the moment
const HomeAuctions = ({homeAuctions, history}) => {
  if (!homeAuctions[0]) {
    return <p>loading~~~</p>
  } else {
    return (
      <Container className="ui tiny images">
       {homeAuctions.map(homeAuction => <HomeAuction key={homeAuction.artwork.id} homeAuction={homeAuction} history={history} />)}
      </Container>
    )
  }
}
//dispatch is not in use: 
const clickArtist = (id, history, dispatch) => {
  history.push('/artist/' + id);
}

const HomeArtist = ({ artist, history }) => {
  return (
    <span>
      <Image className="ui image" src={artist.image_url} onClick={() => clickArtist(artist.id, history)} />
      <span className="ui label">
        <span>artistid: {artist.id}</span>
        <br />
        <span>description {artist.description}</span>
      </span>
    </span>
  )
}

const HomeArtists = ({ homeArtists, history }) => {
  if(!homeArtists[0]) {
    return <div>loading~~~~</div>
  } else {
    return (
      <Container className="ui small images">
        {homeArtists.map(homeArtist => <HomeArtist key={homeArtist.id} artist={homeArtist} history={history} />)}
      </Container>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    // Auctions.fetchAuctionData('/auctions');
      dispatch(Auctions.fetchingAuctions(true));

      fetch('/home')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(Auctions.fetchingAuctions(false));
        console.log('hererererere');
        return response.json();
      })
      .then(data => {
        console.log('im data: ', data);
        let { current, expired, featuredArt } = data;
        dispatch(Auctions.passedAuctionsFetchedSuccess(expired));
        dispatch(Auctions.ongoingAuctionsFetchedSuccess(current));
        dispatch(Auctions.featuredArtsFetchedSuccess(featuredArt));
      })
      .catch(() => dispatch(Auctions.fetchAuctionErrored(true)));
  }
 
    render() {
      
      return (
        <div>
          <MainArts mainArts={this.props.mainArts} history={this.props.history} />
        <Divider />
        <p>---------------------------</p>
        <p>Auctions</p>
        <HomeAuctions homeAuctions={this.props.homeAuctions} history={this.props.history} />
        <p>Artists</p>
        <Divider />
        <HomeArtists homeArtists={this.props.homeArtists} history={this.props.history} />
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
