const dotenv = require('dotenv').config();
process.env.NODE_ENV = 'TESTING';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
const db = require('./../server/database/config.js');
const createSchema = require('./../server/database/schema.js');
const model = require('./../server/database/queries.js');
const uploadData = require ('./../server/database/uploadSeedData.js');


const dummy1 = [{
    password: 'hash',
    username: 'jobojo',
    first_name: 'john',
    last_name: 'smith',
    address: '1234 highway lane',
    email: 'johnsmith@yahoo.com',
    type: 'user',
  },{
    password: 'hash',
    username: 'jobojo2',
    first_name: 'johnsssss',
    last_name: 'smith',
    address: '1234 highway lane',
    email: 'johnsmith2@yahoo.com',
    type: 'user',
  }];
const result1 = [{
  id: 1,
  password: 'hash',
  username: 'jobojo',
  email: 'johnsmith@yahoo.com',
  first_name: 'john',
  last_name: 'smith',
  type: 'user',
  address: '1234 highway lane' },{
  id: 2,
  password: 'hash',
  username: 'jobojo2',
  email: 'johnsmith2@yahoo.com',
  first_name: 'johnsssss',
  last_name: 'smith',
  type: 'user',
  address: '1234 highway lane' }];


const flushDatabase = function () {
  return createSchema(db);
};

const seedDatabase = function () {
  return uploadData(db);
};

describe('should modify or get data from the users table', () => {
  beforeAll(() => {
    return flushDatabase()
  });

  test('should insert and retrieve a user from database', () => {
    
    return model.createUser(dummy1[0]).then(() => {
      return model.getUser(1)
    })
    .then((data) => {
      expect(data).toEqual([ result1[0] ]);
    });
  });
  test('should insert and retrieve a user from database two times', () => {
    
    return model.createUser(dummy1[1]).then(() => {
      return model.getUser(2)
    })
    .then((data) => {
      expect(data).toEqual([ result1[1] ]);
    });
  });
  test('should return all the users', () => {
    return model.getUsers().then((data) => {
      expect(data).toEqual(result1);
    });
  });
});

describe('should modify or get data from the auctions table', () => {
  beforeAll(() => {
    return flushDatabase()
    .then(() => {
      return seedDatabase();
    });
  });

  test('should insert into the auctions table', () => {
    const test = {
      owner_id: 1,
      artwork_id: 1,
      start_date: '2017-04-09 14:27:07',
      end_date: '2017-06-09 14:27:07',
      start_price: 300,
      buyout_price: 500
    };
    return model.createAuction(test).then(() => {
      return model.getAuctions(20, '2012-06-09 14:27:07', '>');
    })
    .then((data) => {
      expect(data.length).toEqual(7);
    })
  });
  test('should retrieve from the auctions table with a limit', () => {
    return model.getAuctions(3, '2012-06-09 14:27:07', '>')
    .then((data) => {
      expect(data.length).toEqual(3);
    })
  });
  test('should retrieve from the auctions table with ongoing auctions sorted by end date', () => {
    return model.getAuctions(20, '2012-06-09 14:27:07', '>')
    .then((data) => {
      expect(data[0].end_date.getTime()).toBeLessThan(data[6].end_date.getTime());
    })
  });
  test('should be able to update auctions current bid and bid counter', () => {
    return model.updateAuction({ auction_id: 5, bid: { id: 1, bid_price: 12000 } })
    .then(() => {
      return model.getAuction(5);
    })
    .then((data) => {
      expect(data[0].current_bid_id).toEqual('1');
      expect(data[0].current_bid).toEqual('12000');
      expect(data[0].bid_counter).toEqual('1');
    });
  });
});

describe('should modify or get data from the followers table', () => {
  test('should create follower relationships in the followers table', () => {
    return model.createFollower({follower_id: 1, followee_id: 1})
    .then(() => {
      return model.getUserFollowers(1);
    })
    .then((data) => {
      expect(data.length).toEqual(1);
    });
  });
});

describe('should modify or get data from the artworks table', () => {
  test('should create artworks in the artworks table', () => {
    const query = {
      artist_id: 1,
      age: '100',
      estimated_price: 5000,
      art_name: 'the test',
      description: 'testing 1 2 3',
      dimensions: ' 1 x 2 x 3',
      image_url: 'a long url'
    };
    return model.createArtwork(query)
    .then(() => {
      return model.getArtworks();
    })
    .then((data) => {
      expect(data.length).toEqual(9)
    });
  });
  test('should retrieve a list of artworks', () => {
    return model.getArtworks()
    .then((data) => {
      expect(data.length).toEqual(9)
    });
  });
  test('should retrieve a list artist\'s of artworks', () => {
    return model.getUserArtworks(2)
    .then((data) => {
      expect(data.length).toEqual(4);
    });
  });
});

describe('should modify or get data from the bids table', () => {
  afterAll(() => {
    return flushDatabase()
    .then(() => {
      return seedDatabase();
    })
  });

  test('should create a users bid', () => {
    const query =  {
      bidder_id: 1,
      auction_id: 1,
      bid_date: new Date(),
      bid_price: 500
    };

    return model.createBid(query)
    .then(() => {
      return model.getUserBids(1);
    })
    .then((data) => {
      expect(data.length).toEqual(1);
    });
  });
  test('should retrieve a list of users bids', () => {
    return model.getUserBids(4)
    .then((data) => {
      expect(data.length).toEqual(2);
      expect(data[0].bidder_id).toEqual('4');
    });
  });
  test('should retrieve a list of users bids per auction', () => {
    const query = {
      limit: 'all',
      user_id: 3,
      auction_id: 1
    };
    return model.getUserBidsPerAuction(query)
    .then((data) => {
      expect(data.length).toEqual(1);
      expect(data[0].auction_id).toEqual('1');
      expect(data[0].bidder_id).toEqual('3');
    });
  });
  test('should retrieve a users max bid per auction', () => {
    const query = {
      user_id: 3,
      auction_id: 1
    };

    return model.getUserMaxBidPerAuction(query)
    .then((data) => {
      expect(data.bid_price).toEqual('12000');
    });
  });
});
