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
    maxPending = Number(options.max || Infinity),
    progress = options.progress,
    callback = options.callback,
    done = options.done;

  var started = 0,
    finished = 0,
    pending = 0,
    paused = false,
    errors = [],
    results = [];

  if (duration) {
    var d = duration.split(' ');
    duration = ms(Number(d[0]))[d[1]] / getRate(rate);
  }

  var max = (Number(duration) && duration < times) ? duration : times;

  if (progress) {
    var barFormat = (util.isArray(progress)) ? progress[0] : '[:bar] :percent | :current/:total | time: :elapsed | eta: :eta',
      barOpts = (util.isArray(progress)) ? progress[1] : {
        width: 20
      };
    barOpts.total = times || (getRate(rate) / duration);
    var bar = new Progress(barFormat, barOpts);
  }

  function getRate(rate) {
    if (typeof rate === 'string' && rate.indexOf('/') !== -1) {
      var r = rate.split('/');
      return ms(1)[r[1]] / r[0];
    } else if (typeof rate === 'function')
      return getRate(rate());
    else
      throw new Error('invalid rate: ', rate);
  }

  function start() {
    if (started >= max)
      return;
    started += 1;
    pending += 1;
    callback.call({
      pause: pause,
      resume: resume,
      stop: stop
    }, next);
  }

  function pause() {
    paused = true;
    clearInterval(interval);
  }

  function resume() {
    paused = false;
    if (started < max)
      interval = setInterval(start, getRate(rate));
  }

  function stop() {
    clearInterval(interval);
    return done(errors, results);
  }

  function next(err, result) {
    finished += 1;
    pending -= 1;

    errors.push(err);
    results.push(result);

    if (progress)
      bar.tick();

    if (finished >= max)
      return stop();
    else if (!paused && pending > maxPending)
      return pause();
    else if (paused && pending <= maxPending)
      return resume();

    var nextRate = getRate(rate);

    if (_rate !== nextRate) {
      _rate = nextRate;
      pause();
      resume();
    }
  }

  var _rate = getRate(rate);
  var interval = setInterval(start, _rate);
}
