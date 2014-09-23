var ms = require('timey');

module.exports = fnrate;

function fnrate(options) {
  if (!options)
    throw new Error('no options provided');
  else if (!options.rate || !options.callback || !options.done)
    throw new Error('missing required options');
  else if (options.duration && options.times)
    throw new Error('specify duration OR times, not both');
  else if (!options.duration && !options.times)
    throw new Error('missing duration and times');

  var rate = options.rate,
    duration = options.duration,
    times = options.times,
    callback = options.callback,
    done = options.done;

  if (duration) {
    var d = duration.split(' ');
    duration = ms(Number(d[0]))[d[1]];
  }

  // convert rate to 1 per X ms
  // if rate == 10/sec, that should convert rate to 100ms
}
