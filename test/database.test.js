const dotenv = require('dotenv').config();
process.env.NODE_ENV = 'TESTING';
const db = require('./../server/database/config.js');
const createSchema = require('./../server/database/schema.js');
const model = require('./../server/database/queries.js');

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

beforeAll(() => {
  return flushDatabase();
});
describe('should modify or get data from the users table', () => {
  beforeAll(() => {
    return flushDatabase();
  });

  test('should insert and retrieve a user from database', () => {
    
    return model.createUser(dummy1[0]).then(() => {
      return model.getUser(1)
    }).then((data) => {
      expect(data).toEqual([ result1[0] ]);
    });
  });
  test('should insert and retrieve a user from database two times', () => {
    
    return model.createUser(dummy1[1]).then(() => {
      return model.getUser(2)
    }).then((data) => {
      expect(data).toEqual([ result1[1] ]);
    });
  });
  test('should return all the users', () => {
    return model.getUsers().then((data) => {
      expect(data).toEqual(result1);
    });
  });
});

xdescribe('should modify or get data from the auctions table', () => {
  test('should insert into the auctions table', () => {

  });
  test('should retrieve from the auctions table with a limit', () => {

  });
  test('should retrieve from the auctions table with ongoing auctions sorted by end date', () => {

  });
  test('should be able to update auctions current bid and bid counter', () => {

  });
});

xdescribe('should modify or get data from the followers table', () => {
  test('should create follower relationships in the followers table', () => {

  });
});
xdescribe('should modify or get data from the artworks table', () => {
  test('should create artworks in the artworks table', () => {

  });
  test('should retrieve a list of artworks', () => {

  });
  test('should retrieve a list artist\'s of artworks', () => {

  });
});
xdescribe('should modify or get data from the bids table', () => {
  // test('should create a users bid', () => {
  //   return model.createBid().then((data) => {
      
  //   });
  // });
  // test('should retrieve a list of users bids', () => {
  //   return model.getUserBids().then((data) => {

  //   });
  // });
  // test('should retrieve a list of users bids per auction', () => {
  //   const query = {
  //     user_id: ,
  //     auction_id: 
  //   },
  //   return model.getUserBids().then((data) => {

  //   });
  // });
  // test('should retrieve a users max bid per auction', () => {
  //   const query = {
  //     user_id: ,
  //     limit: 1
  //   },

  //   return model.getUserBids(query).then((data) => {

  //   });
  // });
});


