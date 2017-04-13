const db = require('./config.js');
const data = require('./dummyData.js');
const users = data.users;
const artworks = data.artworks;
const auctions = data.auctions;
const bids = data.bids;

module.exports = function insertDummyData (db) {
  return db.tx((t) => {
    return t.batch(users.map(user => (t.query('INSERT INTO users \
            (username, first_name, last_name, email, address, type, password)\
            VALUES \
            (${username}, ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
              returning id', user))));
  })
  .then(() => {
    return db.tx((t) => {
      return t.batch(artworks.map(artwork => (t.query('INSERT INTO artworks \
                (artist_id, age, estimated_price, art_name, description, dimensions, image_url)\
                VALUES \
                ((SELECT id FROM users WHERE id = ${artist_id}), ${age}, ${estimated_price}, ${art_name}, ${description}, ${dimensions}, ${image_url})\
                returning id', artwork))));
    })
  })
  .then(() => {
    return db.tx((t) => {
      return t.batch(auctions.map(auction => (t.query('INSERT INTO auctions \
                (owner_id, artwork_id, start_date, end_date, start_price, buyout_price, current_bid_id, bid_counter, current_bid)\
                VALUES \
                ((SELECT id FROM users WHERE id = ${owner_id}), (SELECT id FROM artworks WHERE id = ${artwork_id}), ${start_date}, ${end_date}, ${start_price}, ${buyout_price}, ${current_bid_id}, ${bid_counter}, ${current_bid})\
                returning id', auction))));
    })
  })
  .then(() => {
    return db.tx((t) => {
      return t.batch(bids.map(bid => (t.query('INSERT INTO bids \
                (bidder_id, auction_id, bid_date, bid_price)\
                VALUES \
                ((SELECT id FROM users WHERE id = ${bidder_id}), (SELECT id FROM auctions WHERE id = ${auction_id}), ${bid_date}, ${bid_price})\
                returning id', bid))));
    })
  })
  .then(() => {
    console.log('success');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
