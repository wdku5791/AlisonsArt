const dotenv = require('dotenv');
dotenv.config();


const db = require('./config.js');

const data = require('./dummyData.js');

const users = data.users;

db.task((t) => {
  return t.batch(users.map(user => t.query('insert into users \
      (username, first_name, last_name, email, address, type, password)\
      values \
      (${username}, ${first_name}, ${last_name}, ${email}, ${address}, ${type}, ${password})\
      returning id', user)));
})
.then(() => {
  console.log('success');
  process.exit;
})
.catch((err) => {
  console.error(err);
  process.exit;
});
