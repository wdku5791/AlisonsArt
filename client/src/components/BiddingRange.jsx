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

  current = +current;
  start = +start;
  buyout = +buyout;
  let avail = current;

  avail = current ? Math.min(current + interval, buyout) : start;

//the className in strong is not working yet, but it should work
  return (
    <span>
      <p>
        <strong className="blue-text">
          Next available bidding amount: {avail.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </strong>
      </p>
      <strong>
        Bid for: 
      </strong>
      <input onChange={e => {
        if(isNaN(e.target.value)) {
          e.target.value = '';
        } else {
          setBid(e.target.value);
        }
      }} />
    </span>
  );
};

export default BiddingRange;
