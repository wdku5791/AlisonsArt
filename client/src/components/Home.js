import React, { Component } from 'react';
import { Grid, Card, Image, Divider, Container } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import * as Auctions from '../actions/auctionActionCreator.jsx';
import * as Artists from '../actions/artistActionCreator.jsx';


const clickArt = (artId, history) => {
  history.push('/auction/' + artId);
};

const onImageClick = (event, history) => {
  var split = event.target.src.split('?');
  var lastIndex = split.length - 1;
  var lastCharacter = Number(split[lastIndex]);
  clickArt(lastCharacter, history);
}

//render the description ... as floating right of the image
//closed auctions should be rendered differently from the ongoing ones
const MainArt = ({ art, history }) => {
  return (
    <Grid.Column>
      <Image src={art.artwork.image_url}/>
      <Card.Content>
        <Card.Header>{art.first_name} {art.last_name} </Card.Header>
        <Card.Meta>{art.artwork.age}</Card.Meta>
        <Card.Description>{art.artwork.description}</Card.Description>
      </Card.Content>
    </Grid.Column>
  );
}

const MainArts = ({ mainArts, history }) => {
  if (!mainArts[0]) {
    return <p>loading~~</p>
  } else {
    let images = []
    mainArts.forEach((item) => {
      let imageObj = {
        original: `${item.artwork.image_url}?${item.artwork.id}`,
        description: `${item.first_name} ${item.last_name} Closing Price: $${item.buyout_price}`, 
      }
      images.push(imageObj);
    })
    return (
      <div>
        <ImageGallery
          items={images}
          slideInterval={7000}
          autoPlay={true}
          showThumbnails={false}
          showFullscreenButton={false}
          onClick={(e) => {onImageClick(e, history)}}
        />
      </div>
    )
  }
}
//the images, when onClick, will lead to bidding page(filled with info for just this artwork).

const HomeAuction = ({ homeAuction, history }) => {
  return (
    <Grid.Column>
      <Card>
        <Image src={homeAuction.artwork.image_url} onClick={() => {
          clickArt(homeAuction.artwork.id, history);
        }} />
        <Card.Content>
          <Card.Header>{homeAuction.artwork.art_name}</Card.Header>
          <Card.Meta>Buyout: ${homeAuction.buyout_price}</Card.Meta>
          <Card.Description>{homeAuction.first_name} {homeAuction.last_name} ({homeAuction.artwork.age})</Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
//not using dispatch for the moment
const HomeAuctions = ({homeAuctions, history}) => {
  if (!homeAuctions[0]) {
    return <p>loading~~~</p>
  } else {
    return (
      <Grid>
        <Grid.Row columns={3}>
          {homeAuctions.map(homeAuction => <HomeAuction key={homeAuction.artwork.id} homeAuction={homeAuction} history={history} />)}
        </Grid.Row>
      </Grid>
    )
  }
}
//dispatch is not in use: 
const clickArtist = (id, history, dispatch) => {
  history.push('/artist/' + id);
}

const HomeArtist = ({ artist, history }) => {
  return (
    <Grid.Column>
      <Card>
        <Image className="ui image" src={artist.image_url} onClick={() => 
          clickArtist(artist.id, history
        )} />
        <Card.Content>
          <Card.Header>{artist.first_name} {artist.last_name}</Card.Header>
          <Card.Description>CATEGORY TAGS GO HERE</Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

const HomeArtists = ({ homeArtists, history }) => {
  if(!homeArtists[0]) {
    return <div>loading~~~~</div>
  } else {
    return (
      <Grid>
        <Grid.Row columns={3}>
          {homeArtists.map(homeArtist => <HomeArtist key={homeArtist.id} artist={homeArtist} history={history} />)}
        </Grid.Row>
      </Grid>
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
        return response.json();
      })
      .then(data => {

        let {current, expired, featuredArt} = data;
        dispatch(Auctions.passedAuctionsFetchedSuccess(expired));
        dispatch(Auctions.ongoingAuctionsFetchedSuccess(current));
        dispatch(Auctions.featuredArtsFetchedSuccess(featuredArt));
      })
      .catch(() => {
        dispatch(Auctions.fetchingAuctions(false));
        dispatch(Auctions.fetchAuctionErrored(true));
      });
  }
 
    render() {
      return (
        <div>
        <h3>ArtPoint is an online auction place to connect aspiring artists with art lovers</h3>
        <Divider />
          <MainArts mainArts={this.props.mainArts} history={this.props.history} />
        <Divider />
        <h3>Auctions</h3>
        <HomeAuctions homeAuctions={this.props.homeAuctions} history={this.props.history} />
        <h3>Artists</h3>
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
    mainArts: state.auctions.fetchedPassedAuctions,
    homeAuctions: state.auctions.fetchedOngoingAuctions,
    homeArtists: state.auctions.fetchedFeaturedArts
  }
};

export default connect(mapStateToProps)(Home);
