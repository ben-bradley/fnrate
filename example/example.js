var fnrate = require('../');
var counter = 0;

fnrate({
  rate: '10/sec',
  times: 20,
  duration: '10 sec',
  progress: true,
  callback: function (next) {
    counter += 1;
    next();
  },
  done: function (errors, results) {
    (counter).should.equal(20);
    done();
  }
});
