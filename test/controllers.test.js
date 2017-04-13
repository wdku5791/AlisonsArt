process.env.NODE_ENV = "TESTING";
const supertest = require('supertest');
const app = require('../server/server.js');
const db = require('./../server/database/config.js');
const createSchema = require('./../server/database/schema.js');
const model = require('./../server/database/queries.js');
const uploadData = require ('./../server/database/uploadSeedData.js')

describe('iii', () => {

  beforeAll(() => {
    return createSchema(db)
    .then(() => {
      return uploadData(db);
    });
  });

  test('it should be handled by the auctions controller', () => {
    return supertest(app)
    .get('/auctions')
    .expect(200);
  });

  test('it should fail without a body', () => {
    return supertest(app)
    .post('/auctions', {})
    .expect(500);
  });

});
