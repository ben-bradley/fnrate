var ms = require('timey'),
  Progress = require('progress'),
  util = require('util');

module.exports = function (options) {
  if (!options)
    throw new Error('no options provided');
  else if (!options.rate || !options.callback || !options.done)
    throw new Error('missing required options');
  else if (!options.duration && !options.times)
    throw new Error('missing duration AND times, provide one or both');

  var rate = options.rate,
    duration = options.duration,
    times = Number(options.times || Infinity),
    maxPending = options.max,
    progress = options.progress,
    callback = options.callback,
    done = options.done;

  var started = 0,
    finished = 0,
    paused = false,
    errors = [],
    results = [];

  var r = rate.split('/');
  rate = ms(1)[r[1]] / r[0]; // if options.rate == '10/sec', rate == 100

  if (duration) {
    var d = duration.split(' ');
    duration = ms(Number(d[0]))[d[1]] / rate;
  }

  var max = (Number(duration) && duration < times) ? duration : times;

  if (progress) {
    var barFormat = (util.isArray(progress)) ? progress[0] : '[:bar] :percent | :current/:total | time: :elapsed | eta: :eta',
      barOpts = (util.isArray(progress)) ? progress[1] : {
        width: 20
      };
    barOpts.total = times || (rate / duration);
    var bar = new Progress(barFormat, barOpts);
  }

  function start() {
    started += 1;
    callback(next);
  }

  function next(err, result) {
    finished += 1;
    var pending = started - finished;

    errors.push(err);
    results.push(result);

    if (progress)
      bar.tick();

    if (!paused && maxPending && pending > maxPending) {
      clearInterval(interval);
      paused = true;
    } else if (paused && pending < maxPending) {
      interval = setInterval(start, rate);
      paused = false;
    } else if (started >= max) {
      clearInterval(interval);
      done(errors, results);
    }
  }

  var interval = setInterval(start, rate);
  start();
}
