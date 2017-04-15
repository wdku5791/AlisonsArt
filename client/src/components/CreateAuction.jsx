import React from 'react';
import { connect } from 'react-redux';

class CreateAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: '',
      preview_image: 'https://www.mountaineers.org/images/placeholder-images/placeholder-400-x-400/image_preview',
      art_name: '',
      age: '',
      description: '',
      length: '',
      height: '',
      width: '',
      categories: [],
      estimated_price: '',
      buyout_price: '',
      start_date: '',
      end_date: '',
      username: this.props.username,
      userId: this.props.userId,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageInput = this.handleImageInput.bind(this);
    this.handleImageCreate = this.handleImageCreate.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleCategoryChange(e) {
    const name = e.target.value
    let clone = this.state.categories.slice();
    if (clone.indexOf(name) === -1) {
      clone.push(name);
    } else {
      clone.splice(clone.indexOf(name), 1);
    }
    this.setState({
      categories: clone
    })
  }

  handleSubmit() {
    let artwork = {
      artist_id: Number(this.state.userId),
      age: this.state.age,
      estimated_price: Number(this.state.estimated_price),
      art_name: this.state.art_name,
      description: this.state.description,
      dimensions: `${this.state.length} x ${this.state.height} x ${this.state.width}`,
      image_url: this.state.image_url,  
    }
    let auction = {
      owner_id: Number(this.state.userId),
      // artwork_id: '',
      estimated_price: Number(this.state.estimated_price),
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      start_price: Number(this.state.estimated_price),
      buyout_price: Number(this.state.buyout_price),
      current_bid: null,
      current_bid_id: null,
      artwork: artwork,
    }
    console.log('submitting auction... auction: ', auction);
    fetch('/auctions', {
        method: 'post',
        headers: new Headers ({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(auction)
      })
      .then((data) => {
        console.log('posting Auction and Artwork SUCCESS! data:  ', data);
      })
      .catch((error) => {
        console.log('posting Auction and Artwork FAILED! error: ', error);
      })
  }

  handleImageInput(e) {
    this.setState({
      image_url: e.target.value
    })
  }

  handleImageCreate() {
    var formData = new FormData();
    formData.append('image_file', document.getElementById('imageToSend').files[0]);
    fetch('/images', {
        method: 'post',
        body: formData
    })
    .then((data) => {
      console.log('posting image to Cloudinary SUCCESS! data: ', data);
      if (!data.ok) {
        throw Error(data.responseText);
      } else {
        return data.json();
      }
    })
    .then((response) => {
      console.log('response: ', response);
      this.setState({
        image_url: response.url,
        preview_image: response.url
      })
    })
    .catch((error) => {
      console.log('posting image to Cloudinary FAILED! error: ', error);
    })
  }

  render() {
    return (
      <div>
        <form>
          <input type='file' name='image' accept='image/*' id='imageToSend' onChange={this.handleImageCreate}/>
          <button type='button' onClick={this.handleImageCreate}>Upload Image...</button>
          <br />
          <img src={this.state.preview_image} />
          <br />
          Piece Name:
          <input type='text' name='art_name' onChange={this.handleInputChange} value={this.state.art_name} placeholder='ex:starry night' />
          <br />
          Year:
          <input type='number' name='age' onChange={this.handleInputChange} value={this.state.age} placeholder='ex: 1911' />
          <br />
          Description:
          <input type='text' name='description' onChange={this.handleInputChange} value={this.state.description} />
          <br />
          Dimensions (inches):
          <br />
            length:
            <input type='number' name='length' onChange={this.handleInputChange} value={this.state.length}/>
            height:
            <input type='number' name='height' onChange={this.handleInputChange} value={this.state.height}/>
            width:
            <input type='number' name='width' onChange={this.handleInputChange} value={this.state.width}/>
          <br />
          Categories:
          <br />
          <input type='checkbox' value='painting' onChange={this.handleCategoryChange}/> Painting <br />
          <input type='checkbox' value='photography' onChange={this.handleCategoryChange}/> Photography <br />
          <input type='checkbox' value='sculpture' onChange={this.handleCategoryChange}/> Sculpture <br />
          Estimated Value:
          <input type='number' name='estimated_price' onChange={this.handleInputChange} value={this.state.estimated_price}/>
          <br />
          Buyout Price: 
          <input type='number' name='buyout_price' onChange={this.handleInputChange} value={this.state.buyout_price}/>
          <br />
          Start Date:
          <input type='text' name='start_date' onChange={this.handleInputChange} value={this.state.start_date} placeholder='YYYY-MM-DD HH:MM:SS'/>
          End Date:
          <input type='text' name='end_date' onChange={this.handleInputChange} value={this.state.end_date} placeholder='YYYY-MM-DD HH:MM:SS'/>
          <br/>
          <input type='button' value='Submit' onClick={this.handleSubmit}/>
        </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(`mapStateToProps state: ${JSON.stringify(state)}`);
  return {
    username: state.user.username,
    userId: state.user.userId,
  }
}

export default connect(mapStateToProps)(CreateAuction);
