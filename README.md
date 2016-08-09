# simple-realurl

[![NPM](https://nodei.co/npm/simple-realurl.png)](https://nodei.co/npm/simple-realurl/)
[![Build Status](https://travis-ci.org/lukekarrys/simple-realurl.png?branch=master)](https://travis-ci.org/lukekarrys/simple-realurl)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A simple node module to convert short url's to the original url.

Based off [Manuel van Rijn's original realurl](https://github.com/manuelvanrijn/node-realurl), I created this to remove some dependencies (copypaste) and any global bin files.

## Getting Started

Install the module with: `npm install simple-realurl --save`

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

## License

Copyright (c) 2012 Manuel van Rijn - Licensed under the MIT license.
Copyright (c) 2012-2016 Luke Karrys - Licensed under the MIT license.
