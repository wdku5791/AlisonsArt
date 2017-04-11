//COMMENT OUT CONFIG.JS IN SERVER.JS WHEN YOU'RE DONE

const dotenv = require('dotenv');
dotenv.config();
// const db = require('./config.js');
const data = require('./dummyData.js');
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const createSchema = require ('./schema.js')

let url = null;

const whichDb = function() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'TEST') {
    url = process.env.TESTING_DATABASE_URL;
  } else if (process.env.NODE_ENV === 'DEV') {
    url = process.env.DATABASE_URL;
  } else if (process.env.NODE_ENV === 'CONNECTION') {
    url = process.env.PRODUCTION_DATABASE_URL;
  }
}

whichDb()
let db = pgp(url);

createSchema(db)
.then(() => {
  insertDummyData(db);
});


const users = data.users;
const artworks = data.artworks;
const auctions = data.auctions;
const bids = data.bids;

const insertDummyData = function (db) {
  db.task((t) => {
    return t.batch(users.map(user => t.query('INSERT INTO users \
        (username, first_name, last_name, email, address, type, password)\
        VALUES \
        (${username}, ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
          returning id', user)));
  })
  .then(() => {
    console.log('success');
    process.exit;
  })
  .catch((err) => {
    console.error(err);
    process.exit;
  });

  db.task((t) => {
    return t.batch(artworks.map(artwork => t.query('INSERT INTO artworks \
        (artist_id, age, estimated_price, art_name, description, dimensions, image_url)\
        VALUES \
        ((SELECT id FROM users WHERE id = ${artist_id}), ${age}, ${estimated_price}, ${art_name}, ${description}, ${dimensions}, ${image_url})\
        returning id', artwork)));
  })
  .then(() => {
    console.log('success');
    process.exit;
  })
  .catch((err) => {
    console.error(err);
    process.exit;
  });

  db.task((t) => {
    return t.batch(auctions.map(auction => t.query('INSERT INTO auctions \
        (owner_id, artwork_id, start_date, end_date, start_price, buyout_price, current_bid, bid_counter)\
        VALUES \
        ((SELECT id FROM users WHERE id = ${owner_id}), (SELECT id FROM artworks WHERE id = ${artwork_id}), ${start_date}, ${end_date}, ${start_price}, ${buyout_price}, ${current_bid}, ${bid_counter})\
        returning id', auction)));
  })
  .then(() => {
    console.log('success');
    process.exit;
  })
  .catch((err) => {
    console.error(err);
    process.exit;
  });

  db.task((t) => {
    return t.batch(bids.map(bid => t.query('INSERT INTO bids \
        (bidder_id, auction_id, bid_date, bid_price)\
        VALUES \
        ((SELECT id FROM users WHERE id = ${bidder_id}), (SELECT id FROM auctions WHERE id = ${auction_id}), ${bid_date}, ${bid_price})\
        returning id', bid)));
  })
  .then(() => {
    console.log('success');
    process.exit;
  })
  .catch((err) => {
    console.error(err);
    process.exit;
  });
}







