import React from 'react';
import { Container, Input } from 'semantic-ui-react';

let BiddingRange = ({current, start, buyout, setBid}) => {
  //set interval according to buyout price
  let interval = 0;
  if (buyout < 100) {
    interval = 10;
  } else if (buyout < 500) {
    interval = 50;
  } else if (buyout < 1000) {
    interval = 100;
  } else if (buyout < 5000) {
    interval = 500;
  } else {
    interval = 1000;
  }

  // if (!current) {
  //   //bid: [start, buyout];
  //   return (
  //     <Form.Input label='Bid for...' type='text' />
  //     );
  // } else {
  //   //bid: [current+inteval, buyout]
  // }

  current = +current;
  start = +start;
  buyout = +buyout;

  start = start < current ? current : start;

  let range = [];

  for(let i = start; i <= buyout; i += interval) {
    range.push({key: i, text: '$'+i, value: i});
  }

  return (
    <Container>
      <label><strong>Bid for: </strong></label>{' '}<Input type='text' placeholder={1234}/>
    </Container>
  );
};
// <Form.Field 
      // control={Select} 
      // options={range}
      // onChange={(e, value) => { 
        // setBid(value.value) 
      // }} 
      // placeholder='Bid now'
    // />

export default BiddingRange;