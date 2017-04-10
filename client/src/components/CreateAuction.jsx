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
      <input type='number' placeholder='ex: 1911' />
      <br />
      Description:
      <input type='text' />
      <br />
      Dimensions (inches):
      <br />
        length:
        <input type='number' />
        height:
        <input type='number' />
        width:
        <input type='number' />
      <br />
      Categories:
      <br />
      <input type='checkbox' /> Painting <br />
      <input type='checkbox' /> Photography <br />
      <input type='checkbox' /> Sculpture <br />
      Estimated Value:
      <input type='number' />
      <br />
      Buyout Price: 
      <input type='number' />
      <input type='submit' value='Submit' />
    </form>
  </div>
)

export default CreateAuction;