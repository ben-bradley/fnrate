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

});
