# FnRate [![Build Status](https://secure.travis-ci.org/ben-bradley/fnrate.png)](http://travis-ci.org/ben-bradley/fnrate)

A bit of code that will limit the iteration of a function to a specific rate.

## Install

```
npm intall fnrate
```

-or-

```
npm install ben-bradley/fnrate
```

## Examples

### Basic example:

```javascript
var fnrate = require('fnrate');

fnrate({
  rate: '10/sec',
  duration: '5 min', // will run for 5 minutes & stop
  times: 100, // `callback` will iterate 100 times
  max: 5, // [optional] there will only be 5 pending `callback`s at any time
  // `callback` will iterate for whichever is less: times or duration
  callback: function(next) {
    // do stuff
    next(); // next([error, [result]]);
  },
  done: function(err, results) {
    if (err) console.log(err);
    else console.log('all done!');
  }
});
```

### Variable rate example

```javascript
var fnrate = require('fnrate');
var i = 0;

fnrate({
  rate: function () {
    if (i < 25) return '10/sec';
    else if (i < 50) return '20/sec';
    else if (i < 75) return '5/sec';
    else return '15/sec';
  },
  times: 100,
  max: 10,
  callback: function (next) {
    i += 1;
    console.log(i);
    next(null, i);
  },
  done: function (err, results) {
    console.log('all done!');
    done();
  }
});
```

## Options

- `rate` - The rate at which you wish to initiate your `callback`. Expects a string: `n/period` where `n` is a number and `period` is one of
  - `'sec'`
  - `'second'`
  - `'min'`
  - `'minutes'`
  - `'hr'`
  - `'hour'`
- `duration` - The length of time that you want the itaration to last. Expects a string: `n period` where `n` is the number of `period`s.
- `times` - The number of times that you want the `callback` to run.
- `max` - The maximum number of pending `callback`s at any time.
- `callback` - The function to iterate. Provides a `next` function that must be called when complete to trigger the next iteration. If the `next` function is called with arguments, it will pass them through to the `done`;
- `done` - The function to call when the `duration` or `times` are complete.

## Flow control

I found that I wanted to be able to pause and resume the callbacks from within the callback so as of version 0.0.3, you can:

- `options.max` - _Integer_ - Setting this option will cause fnrate to pause if there are ever more than this number of pending callbacks.
- `pause()` - Calling `this.pause()` within the `callback` will also pause the execution of other callbacks until `this.resume()` is called.
- `resume()` - Clears the `pause()` state and resumes execution of the `callback`.

## Test

```
npm test
```

-or-

```
mocha -R spec
```

## Versions

- 0.0.5 - Made .rate able to accept a function to modify rates on the fly!
- 0.0.4 - Added code to catch race conditions
- 0.0.3 - More finely-tuned version of flow-control
- 0.0.2 - First atempt at flow-control
- 0.0.1 - Initial drop & npm publish
