const pgp = require('pg-promise');

const url = process.env.NODE_ENV === 'TESTING' ? process.env.TESTING_DATABASE_URL : process.env.DATABASE_URL;

module.exports = pgp(url);
