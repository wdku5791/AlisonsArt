import React from 'react';
import { Form, Select } from 'semantic-ui-react';

let BiddingRange = ({current, start, end, setBid}) => {
  const interval = 1000;
  current = +current;
  start = +start;
  end = +end;

  start = start < current ? current : start;

  let range = [];

  for(let i = start; i <= end; i += interval) {
    range.push({key: i, text: '$'+i, value: i});
  }

  return (
    <Form.Field 
      control={Select} 
      options={range}
      onChange={(e, value) => { 
        setBid(value.value) 
      }} 
      placeholder='Bid now'
    />
  );
};

export default BiddingRange;