# FnRate

A bit of code that will limit the iteration of a function to a specific rate.

## Install

`npm intall fnrate`

-or-

`npm install ben-bradley/fnrate`

## Example

```javascript
var fnrate = require('fnrate');

fnrate({
  rate: '10/sec',
  // specify a `duraiton` or a `times`, not both
  duration: '5 min', // will run for 5 minutes & stop
  // times: 100, // `callback` will iterate 100 times
  callback: function(next) {
    // do stuff
    next();
  },
  done: function(err, results) {
    if (err) console.log(err);
    else console.log('all done!');
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
- `duration` - The length of time that you want the itaration to last. Expects a string: `n period` where `n` is the number of `period`s. May not be used with `times`.
- `times` - The number of times that you want the `callback` to run. May not be used with `duration`.
- `callback` - The function to iterate. Provides a `next` function that must be called when complete to trigger the next iteration. If the `next` function is called with arguments, it will pass them through to the `done`;
- `done` - The function to call when the `duration` or `times` are complete.

## Test

`npm test`
