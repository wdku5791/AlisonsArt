import React from 'react';

class CreateAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieceName: '',
      year: '',
      description: '',
      length: '',
      height: '',
      width: '',
      categories: [],
      estimatedValue: '',
      buyoutPrice: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`target name: ${name}\ntarget value ${value}`);
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
    console.log(`clone: ${clone}`);
    this.setState({
      categories: clone
    })
  }

  handleSubmit() {
    console.log(`attempting to create auction...`);
  }

  render() {
    return (
      <div>
        <form>
          <button type='button'>Upload Image...</button>
          <img src='./assets/temp.png' />
          <br />
          Piece Name:
          <input type='text' name='pieceName' onChange={this.handleInputChange} value={this.state.pieceName} placeholder='ex:starry night' />
          <br />
          Year:
          <input type='number' name='year' onChange={this.handleInputChange} value={this.state.year} placeholder='ex: 1911' />
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
          <input type='number' name='estimatedValue' onChange={this.handleInputChange} value={this.state.estimatedValue}/>
          <br />
          Buyout Price: 
          <input type='number' name='buyoutPrice' onChange={this.handleInputChange} value={this.state.buyoutPrice}/>
          <input type='button' value='Submit' onClick={this.handleSubmit}/>
        </form>
    </div>
    )
  }
}

export default CreateAuction;