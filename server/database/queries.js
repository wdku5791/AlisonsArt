const pgp = require('pg-promise')();

module.exports = {
  getUser: function (userId) {
    return db.query('select * from users');
  },
  getUsers: function () {
    return db.query('select * from users');
  },
  getUserOwnedAuctions: function (userId) {
    return db.query('select * from auctions where owner_id=$1', [userId]);
  },
  getUserBiddingAuctions: function () {
    //TODO
  },
  getUserBids: function (userId) {
    return db.query('select * from bids where bidder_id=$1', [userId]);
  },
  getUserBidsPerAuction: function ({user_id, auction_id}) {
    /*
    {
      user_id:
      auction_id:
    }
    select * from bids where bidder_id=1 and auction_id=1
    */
    return db.query('select * from bids where bidder_id=$1 and auction_id=$2', [user_id, auction_id]);
  },
  getUserMessages: function (userId) {
    
  },
  getAuctions: function () {
    return db.query('select * from auctions');
  },

  createUser: function (userObj) {
    /*
    {
      password:
      username:
      first_name:
      last_name:
      address:
      email:
      type:
    }
    insert into users (username, first_name, last_name, email, address, type, password) values ('wdku', 'winston', 'ku', 'wdku5791@gmail.com', '471 quail drive', 'user', 'hashed')
    */
    return db.query('insert into users \
      (username, first_name, last_name, email, address, type, password)\
      values \
      (${username}, ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
      returning id', userObj);
  },
  createAuction: function (auctionObj) {
    /*
    {
      owner_id:
      artwork_id:
      start_date:
      end_date:
      start_price:
      buyout_price:
      current_bid:
      bid_counter:
    }
    insert into auctions (owner_id, artwork_id, start_date, end_date, start_price, buyout_price, bid_counter) values ('1', '1', '2017-01-07 04:05:06 -8:00', '2017-01-08 04:05:06 -8:00', '100', '500', '0')
    */

    return db.query('insert into auctions \
      (owner_id, artwork_id, start_date, end_date, start_price, buyout_price, bid_counter)\
      values \
      (${owner_id}, ${artwork_id}, ${start_date}, ${end_date}, ${start_price}, ${buyout_price}, 0)\
      returning id', auctionObj);
  },
  createArtwork: function (artworkObj) {
    /*
    {
      artist_id:
      age:
      estimated_price:
      art_name:
      description:
      dimensions:
      image_url:
    }
    insert into artworks (artist_id, age, estimated_price, art_name, description, dimensions, image_url) values ('1', '520', '200', 'Alisons Masterpiece', 'Emaculately crafted by a master sculptor', '10 x 20 x 15', 'image_urlsuperlongstring')
    */

    return db.query('insert into artworks \
      (artist_id, age, estimated_price, art_name, description, dimensions, image_url)\
      values \
      (${artist_id}, ${age}, ${estimated_price}, ${art_name}, ${description}, ${dimensions}, ${image_url})\
      returning id', artworkObj);
  },
  createBid: function (bidObj) {
    /*
    {
      bidder_id:
      auction_id:
      bid_date:
      bid_price:
    }
    insert into bids (bidder_id, auction_id, bid_date, bid_price) values ('1', '1', '2017-01-08 04:05:06 -8:00', '250')
    */
    return db.query('insert into bids \
      (bidder_id, auction_id, bid_date, bid_price)\
      values \
      (${bidder_id}, ${auction_id}, ${bid_date}, ${bid_price})\
      returning id', bidObj);
  },
  createFollow: function (followerObj) {
    /*
    {
      follower_id:
      followee_id:
    }
    insert into followers (follower_id, followee_id) values ('1', '1')
    */
    return db.query('insert into bids \
      (follower_id, followee_id)\
      values \
      (${follower_id}, ${followee_id})\
      returning id', followerObj);
  },
  createMessage: function (messageObj) {
    /*
    {
      text:
      sender_id:
      reciever_id:
      message_date:
    }
    insert into messages (text, sender_id, receiver_id, message_date) values ('woohoo lots of fun', '1', 1, '2017-01-08 04:05:06 -8:00')
    */
    return db.query('insert into messages \
      (text, sender_id, receiver_id, message_date)\
      values \
      (${text}, ${sender_id}, ${receiver_id}, ${message_date})\
      returning id', messageObj);
  },

  updateUser: function () {
    //TODO
  },
  updateAuction: function () {
    //TODO
  },


};