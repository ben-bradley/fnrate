var fnrate = require('../'),
  should = require('should');

describe('FnRate', function () {

  it('should be requireable', function () {
    (fnrate).should.be.a.Function;
  });

  it('should iterate for 2 seconds with only duration set', function (done) {
    this.timeout(2500);
    var counter = 0;
    fnrate({
      rate: '10/sec',
      duration: '2 sec',
      callback: function (next) {
        counter += 1;
        next();
      },
      done: function (errors, results) {
        (counter).should.equal(20);
        done();
      }
    });
  });

  it('should iterate for 2 seconds with both duration and times set', function (done) {
    this.timeout(2500);
    var counter = 0;
    fnrate({
      rate: '10/sec',
      duration: '2 sec',
      times: 9999999999,
      callback: function (next) {
        counter += 1;
        next();
      },
      done: function (errors, results) {
        (counter).should.equal(20);
        done();
      }
    });
  });

  it('should iterate 20 times with only times set', function (done) {
    this.timeout(2500);
    var counter = 0;
    fnrate({
      rate: '10/sec',
      times: 20,
      callback: function (next) {
        counter += 1;
        next();
      },
      done: function (errors, results) {
        (counter).should.equal(20);
        done();
      }
    });
  });

  it('should iterate 20 times with both times and duration set', function (done) {
    this.timeout(2500);
    var counter = 0;
    fnrate({
      rate: '10/sec',
      times: 20,
      duration: '1 hour',
      callback: function (next) {
        counter += 1;
        next();
      },
      done: function (errors, results) {
        (counter).should.equal(20);
        done();
      }
    });
  });

  it('should show a progress bar', function (done) {
    // this one is kind of a cheat
    // you have to put an eyeball to the bar to validate it
    this.timeout(2500);
    var counter = 0;
    fnrate({
      rate: '10/sec',
      times: 20,
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
  });

  it('should pause when the max pending is reached', function (done) {
    this.timeout(5000);
    fnrate({
      rate: '50/sec',
      times: 100,
      max: 5,
      callback: function (next) {
        setTimeout(next, 250);
      },
      done: function (err, results) {
        done();
      }
    });
  });

  it('should pause and resume from within the callback', function (done) {
    this.timeout(3000);
    fnrate({
      rate: '2/sec',
      times: 10,
      callback: function (next) {
        setTimeout(this.resume, 1000);
        this.pause();
        next();
      },
      done: function (err, results) {
        done();
      }
    });
  });

});
