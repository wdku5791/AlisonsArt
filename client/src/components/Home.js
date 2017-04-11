import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as Artists from '../actions/artistActionCreator.jsx';

let MainArts = ({mainArts, history}) => {
  // console.log('main arts: ', mainArts[0]);
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
let HomeAuctions = ({homeAuctions, history}) => {
  console.log('homeAuctions: ', homeAuctions);
  if (!homeAuctions[0]) {
    return <p>loading~~~</p>
  } else {
    let id = homeAuctions[0].auction.id;
    console.log('iddd: ', homeAuctions[0].auction.id);
    console.log('homeAuctions props: ', history);
    return (
      <div>
        <img src="./assets/logo.jpeg" onClick={() => {
          
          //fetch info from backend for population
          // fetch('/??')
          // .then(response => {

          // })

          //redirect to another page (specific to this auction by id)
          // console.log('onclick props: ', this.props);
          history.push('/auction/' + id);


          // dispatch()
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

let HomeArtists = ({homeArtists, history}) => {
  return (
    <div>
      <img src="./assets/logo.jpeg" />
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
      //will change the url to /home when the endpoint is ready
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
        //destructure the data here:
        //{} = data;
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
      console.log('auctions:', this.props.homeAuctions);


      return (
        <div>
          <MainArts mainArts={this.props.mainArts} history={this.props.history} />
        <Divider />
        <p>---------------------------</p>
        <p>Auctions</p>
        <HomeAuctions homeAuctions={this.props.homeAuctions} history={this.props.history}/>
        <p>Artists</p>
        <Divider />
        <HomeArtists homeArtists={this.props.homeArtists} history={this.props.history} />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    mainArts: state.auctions.fetchedPassedAuctions,
    homeAuctions: state.auctions.fetchedOngoingAuctions,
    homeArtists: state.artists
  }
};

export default connect(mapStateToProps)(Home);
