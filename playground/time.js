var moment = require('moment');

var date = moment();

date.add(1, 'years').subtract(9, 'months');

console.log(date.format('Do-MMM-YYYY HH:MM:SS'));

