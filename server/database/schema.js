const pgp = require('pg-promise')();

module.exports = function createSchemas (db) {
  return db.query('CREATE TABLE IF NOT EXISTS users (\
      id SERIAL PRIMARY KEY NOT NULL,\
      password VARCHAR(300) NOT NULL,\
      username VARCHAR(30) NOT NULL,\
      email VARCHAR(30) NOT NULL,\
      first_name VARCHAR(30) NOT NULL,\
      last_name VARCHAR(30) NOT NULL,\
      type VARCHAR(30) NOT NULL,\
      address VARCHAR(50)\
    );')
  .catch((error) => {
    console.log('error creating database tables 1', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS artworks (\
      id SERIAL PRIMARY KEY NOT NULL,\
      artist_id BIGINT REFERENCES users(id),\
      age VARCHAR(50) NOT NULL,\
      estimated_price BIGINT NOT NULL,\
      art_name VARCHAR(50) NOT NULL,\
      description TEXT,\
      dimensions TEXT,\
      image TEXT\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 2', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS auctions (\
      id SERIAL PRIMARY KEY NOT NULL,\
      owner_id BIGINT REFERENCES users(id),\
      artwork_id BIGINT REFERENCES artworks(id),\
      start_date TIMESTAMP NOT NULL,\
      end_date TIMESTAMP NOT NULL,\
      start_price BIGINT NOT NULL,\
      buyout_price BIGINT NOT NULL,\
      current_bid BIGINT,\
      bid_counter BIGINT\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 3', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS bids (\
      id SERIAL PRIMARY KEY NOT NULL,\
      bidder_id BIGINT REFERENCES users(id),\
      auction_id BIGINT REFERENCES auctions(id),\
      bid_date TIMESTAMP NOT NULL,\
      bid_price BIGINT NOT NULL\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 4', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS attributes (\
      id SERIAL PRIMARY KEY NOT NULL,\
      attribute VARCHAR(50) NOT NULL\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 5', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS messages (\
      id SERIAL PRIMARY KEY NOT NULL,\
      text text NOT NULL,\
      sender_id BIGINT REFERENCES users(id),\
      receiver_id BIGINT REFERENCES users(id),\
      message_date TIMESTAMP NOT NULL\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 6', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS artwork_attributes (\
      id SERIAL PRIMARY KEY NOT NULL,\
      attribute_id BIGINT NOT NULL REFERENCES attributes(id),\
      artwork_id BIGINT NOT NULL REFERENCES artworks(id)\
    )')
  })
  .catch((error) => {
    console.log('error creating database tables 7', error);
  })
  .then(()=>{
    return db.query('CREATE TABLE IF NOT EXISTS followers (\
      id SERIAL PRIMARY KEY NOT NULL,\
      follower_id BIGINT NOT NULL REFERENCES users(id),\
      followee_id BIGINT NOT NULL REFERENCES users(id)\
    )')
  })
  .then(()=> {
    console.log('database tables created succesfully');
  })
  .catch((error) => {
    console.log('error creating database tables', error);
  })
};