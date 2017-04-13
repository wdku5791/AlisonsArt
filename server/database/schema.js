module.exports = function createSchemas(db) {
  return db.query('DROP TABLE IF EXISTS\
    followers, artwork_attributes, attributes, messages,\
    bids, auctions, artworks, users cascade \
    ')
  .catch((error) => {
    console.log('error dropping existing tables', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS users (\
      id SERIAL PRIMARY KEY NOT NULL,\
      password VARCHAR(300) NOT NULL,\
      username VARCHAR(30) NOT NULL UNIQUE,\
      email VARCHAR(30) NOT NULL UNIQUE,\
      first_name VARCHAR(30) NOT NULL,\
      last_name VARCHAR(30) NOT NULL,\
      type VARCHAR(30) NOT NULL,\
      address VARCHAR(50)\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables users', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS artworks (\
      id SERIAL PRIMARY KEY NOT NULL,\
      artist_id BIGINT NOT NULL REFERENCES users(id),\
      age VARCHAR(50) NOT NULL,\
      estimated_price BIGINT NOT NULL,\
      art_name VARCHAR(50) NOT NULL,\
      description TEXT,\
      dimensions TEXT,\
      image_url TEXT\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables artworks', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS auctions (\
      id SERIAL PRIMARY KEY NOT NULL,\
      owner_id BIGINT NOT NULL REFERENCES users(id),\
      artwork_id BIGINT NOT NULL REFERENCES artworks(id),\
      start_date TIMESTAMP NOT NULL,\
      end_date TIMESTAMP NOT NULL,\
      start_price BIGINT NOT NULL,\
      buyout_price BIGINT NOT NULL,\
      current_bid_id BIGINT,\
      current_bid BIGINT,\
      bid_counter BIGINT DEFAULT 0\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables auctions', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS bids (\
      id SERIAL PRIMARY KEY NOT NULL,\
      bidder_id BIGINT NOT NULL REFERENCES users(id),\
      auction_id BIGINT NOT NULL REFERENCES auctions(id),\
      bid_date TIMESTAMP NOT NULL,\
      bid_price BIGINT NOT NULL\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables bids', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS attributes (\
      id SERIAL PRIMARY KEY NOT NULL,\
      attribute VARCHAR(50) NOT NULL\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables attributes', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS messages (\
      id SERIAL PRIMARY KEY NOT NULL,\
      text text NOT NULL,\
      sender_id BIGINT NOT NULL REFERENCES users(id),\
      receiver_id BIGINT NOT NULL REFERENCES users(id),\
      message_date TIMESTAMP NOT NULL\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables messages', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS artwork_attributes (\
      id SERIAL PRIMARY KEY NOT NULL,\
      attribute_id BIGINT NOT NULL REFERENCES attributes(id),\
      artwork_id BIGINT NOT NULL REFERENCES artworks(id)\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables artwork_attributes', error);
  })
  .then(() => {
    return db.query('CREATE TABLE IF NOT EXISTS followers (\
      id SERIAL PRIMARY KEY NOT NULL,\
      follower_id BIGINT NOT NULL REFERENCES users(id),\
      followee_id BIGINT NOT NULL REFERENCES users(id)\
    )');
  })
  .catch((error) => {
    console.log('error creating database tables followers', error);
  })
  .then(() => {
    console.log('database tables created');
  });
};
