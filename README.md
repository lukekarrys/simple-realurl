# simple-realurl

[![NPM](https://nodei.co/npm/simple-realurl.png)](https://nodei.co/npm/simple-realurl/)
[![Build Status](https://travis-ci.org/lukekarrys/simple-realurl.png?branch=master)](https://travis-ci.org/lukekarrys/simple-realurl)

A simple node module to convert short url's to the original url.

Based off [Manuel van Rijn's original realurl](https://github.com/manuelvanrijn/node-realurl), I created this to remove some dependencies (copypaste) and any global bin files.

## Getting Started

Install the module with: `npm install simple-realurl`

### Within your NodeJS project

```javascript
var realurl = require('simple-realurl');
realurl.get('http://goo.gl/BGV9x', function(error, result) {
   // error = null;
   // result = "http://github.com/manuelvanrijn/node-realurl";
});

realurl.get('http://this-is-not-a-real-url.com/at-all', function(error, result) {
   // error = Error('URL resulted in a 404');
   // result = null;
});

realurl.get('', function(error, result) {
   // error = Error('Please specify a short url');
   // result = null;
});

realurl.get('url', {agent: false}, function(error, result) {
  // bypasses Node's http/s client pool
});
```

## Release History

* 2013/04/30 - v0.1.4 - *NEW FORK* - Removed all global, bin and copypaste code.
* 2013/03/19 - v0.1.3 - Async support by @lukekarrys.
* 2012/10/08 - v0.1.2 - Added copy to clipboard support.
* 2012/10/03 - v0.1.1 - Fixed a bug regarding line endings...
* 2012/10/02 - v0.1.0 - Initial release.

## License

Copyright (c) 2012 Manuel van Rijn - Licensed under the MIT license.
