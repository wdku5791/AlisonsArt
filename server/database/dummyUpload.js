// SET ENV VARIABLES (follow example.env)

const dotenv = require('dotenv');
dotenv.config();
const data = require('./dummyData.js');
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const createSchema = require ('./schema.js');
const uploadSeedData = require('./uploadSeedData.js');

let url = null;

const whichDb = function() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'TESTING') {
    url = process.env.TESTING_DATABASE_URL;
  } else if (process.env.NODE_ENV === 'DEV') {
    url = process.env.DATABASE_URL;
  } else if (process.env.NODE_ENV === 'PROD') {
    url = process.env.PRODUCTION_DATABASE_URL;
  }
};

whichDb()
let db = pgp(url);

createSchema(db)
.then(() => {
  return uploadSeedData(db);
}).then(() => {
  process.exit(0);
}).catch((err) => {
  console.log(err);
  process.exit(1);
})
