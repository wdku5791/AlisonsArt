const dotenv = require('dotenv').config();
const cron = require('node-cron');
const model = require('./database/queries');
const Moment = require('moment');

let time;
let prevJobTime = new Moment().subtract(5, 'years').format('YYYY-MM-DD HH:mm:ss');
cron.schedule('*/10 * * * * *', function() {
  // console.log('every 30 seconds');
  time = new Moment().format('YYYY-MM-DD HH:mm:ss');
  model.workerAuctions(prevJobTime, time)
  .then((results) => {
    console.log('every 10 seconds', results, time, prevJobTime);
    if (results.length > 0) {
      return model.workerInsertClosed(results);
    }
  })
  .catch((error) => {
    console.log('error in cron', error);
  });
  prevJobTime = time;
});

module.exports = cron;
