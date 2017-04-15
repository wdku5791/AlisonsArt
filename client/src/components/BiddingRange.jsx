import React from 'react';

let BiddingRange = ({current, start, end, setBid}) => {
  const interval = 1000;
  current = +current;
  start = +start;
  end = +end;

  start = start < current ? current : start;

  let range = [];

  for(let i = start; i <= end; i += interval) {
    range.push(i);
  }
  return (
    <select name="Bid now" onChange={(e) => { setBid(e.target.value) }}>
      <option defaultValue="Bid now">Bid now</option>
      {range.map(r => <option key={r}>{r}</option>)}
    </select>
  );
};

export default BiddingRange;