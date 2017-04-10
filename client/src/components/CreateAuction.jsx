import React from 'react';

const CreateAuction = (props) => (
  <div>
    <form>
      <button type='button'>Upload Images...</button>
      <img src='./assets/temp.png' />
      <br />
      Piece Name:
      <input type='text' placeholder='ex:starry night' />
      <br />
      Year:
      <input type='text' placeholder='ex: 1911' />
      <br />
      Dimensions (inches):
      <br />
        length:
        <input type='text' />
        height:
        <input type='text' />
        width:
        <input type='text' />
      <br />
      Categories:
      <br />
      <input type='checkbox' /> Painting <br />
      <input type='checkbox' /> Photography <br />
      <input type='checkbox' /> Sculpture <br />
      Estimated Value:
      <input type='text' />
      <br />
      Buyout Price: 
      <input type='text' />
    </form>
  </div>
)

export default CreateAuction;