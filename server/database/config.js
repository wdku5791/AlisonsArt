const pgp = require('pg-promise')();
const createSchema = require('./schema.js');

const url = process.env.NODE_ENV === 'TESTING' ? process.env.TESTING_DATABASE_URL : process.env.DATABASE_URL;

let db = pgp(url);
createSchema(db);

module.exports = db;
