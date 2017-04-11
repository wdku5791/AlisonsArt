const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const createSchema = require('./schema.js');
const insertDummyData = require('./dummyUpload.js');

const url = process.env.NODE_ENV === 'TESTING' ? process.env.TESTING_DATABASE_URL : process.env.DATABASE_URL;

let db = pgp(url);

module.exports = db;
