var fnrate = require('../');

var count = 0;

fnrate({
  rate: '100/min',
  duration: '15 sec',
  times: 20,
  callback: function (next) {
    console.log(++count);
    next();
  },
  done: function (errors, results) {
    console.log('ALL DONE!');
    console.log(arguments);
  }
});
