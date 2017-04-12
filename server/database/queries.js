const db = require('./config');

module.exports = {
  getUser(userId) {
    return db.query('select * from users where id=$1', [userId]);
  },
  getUsers() {
    return db.query('select * from users');
  },
  getUserOwnedAuctions(userId) {
    return db.query('select * from auctions where owner_id=$1', [userId]);
  },
  getUserBiddingAuctions() {
    //TODO
  },
  getUserBids(userId) {
    return db.query('select * from bids where bidder_id=$1', [userId]);
  },
  getUserBidsPerAuction({ user_id, auction_id, limit }) {
    /*
    {
      user_id:
      auction_id:
    }
    select * from bids where bidder_id=1 and auction_id=1
    */
    return db.query('select * from bids where bidder_id=$1 and auction_id=$2 LIMIT $3^', [user_id, auction_id, limit]);
  },
  getUserMaxBidPerAuction({ user_id, auction_id }) {
    /*
    {
      user_id:
      auction_id:
    }
    select * from bids where bidder_id=1 and auction_id=1
    */
    return db.one('select * from bids where bidder_id=$1 and auction_id=$2 ORDER BY bid_price DESC LIMIT 1', [user_id, auction_id]);
  },
  getUserMessages(userId) {
    return db.query('select * from messages where sender_id=$1 or receiver_id=$1', [userId]);
  },
  getAuctions({ limit, end_date, status }) {
    /*
    {
      limit:
      end_date:
    }
    */
    let queryString;
    if (status === '<') {
      queryString = 'select * from auctions where end_date < $1 ORDER BY end_date ASC LIMIT $2^'
    } else {
      queryString = 'select * from auctions where end_date > $1 ORDER BY end_date ASC LIMIT $2^'
    }
    return db.query(queryString, [end_date, limit]);
  },

  getAuction(auctionId) {
    return db.query('select * from auctions where id = $1', [auctionId]);
  },
  getUserFollowers(userId) {
    return db.query('select * from followers where follower_id = $1', [userId]);
  },
  getArtworks() {
    return db.query('select * from artworks');
  },
  getUserArtworks(userId) {
    return db.query('select * from artworks where artist_id = $1', [userId]);
  },

  createUser(userObj) {
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
  createAuction(auctionObj) {
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
    insert into auctions (owner_id, artwork_id, start_date, end_date, start_price, buyout_price, bid_counter) values ('1', '1', '2017-01-07 04:05:06 -8:00', '2017-01-08 09:05:06 -8:00', '100', '500', '0')
    */

    return db.query('insert into auctions \
      (owner_id, artwork_id, start_date, end_date, start_price, buyout_price)\
      values \
      (${owner_id}, ${artwork_id}, ${start_date}, ${end_date}, ${start_price}, ${buyout_price})\
      returning id', auctionObj);
  },
  createArtwork(artworkObj) {
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
  createAuctionWithArtwork(auctionObj) {
    return createArtwork(auctionObj.artwork)
    .then((result) => {
      auctionObj.auction_id = result[0].id;
      return createAuction(auctionObj);
    })
  },
  createBid(bidObj) {
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
  createFollower(followerObj) {
    /*
    {
      follower_id:
      followee_id:
    }
    insert into followers (follower_id, followee_id) values ('1', '1')
    */
    return db.query('insert into followers \
      (follower_id, followee_id)\
      values \
      (${follower_id}, ${followee_id})\
      returning id', followerObj);
  },
  createMessage(messageObj) {
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

  updateUser() {
    //TODO
  },
  updateAuction(auctionObj) {
    /*
    {
      auction_id:
      bid_id:
    }
    */
    return db.query('update Auctions SET current_bid = ${bid_id}\
      , bid_counter = bid_counter + 1\
      where id = ${auction_id}',auctionObj)
  },


};
