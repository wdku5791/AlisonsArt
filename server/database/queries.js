const pgp = require('pg-promise')();

module.exports = {
  getUser: function () {

  },
  getUsers: function () {
        
  },
  getUserOwnedAuctions: function () {
    
  },
  getUserBiddingAuctions: function () {
    
  },
  getUserBids: function () {
    
  },
  getUserMessages: function () {
    
  },
  getAuctions: function () {
    
  },

  createUser: function (user) {
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
    */
    return db.query('insert into users \
      (username, first_name, last_name, email, address, type, password)\
      values \
      (${username} ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
      returning id', user);
  },
  createAuction: function () {
    
  },
  createArtwork: function () {
    
  },
  createBid: function () {
    
  },
  createFollow: function () {
    
  },
  createMessage: function () {
    
  },

  updateUser: function () {
    
  },
  updateAuction: function () {
    
  },


};