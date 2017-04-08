process.env.NODE_ENV = "TESTING";
const supertest = require('supertest');
const app = require('../server/server.js');

test('it should be handled by the auctions controller', () => {
  return supertest(app)
  .get('/auctions')
  .expect(200, 'you found the auctions path');
});
