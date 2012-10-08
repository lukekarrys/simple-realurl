# Realurl [![Build Status](https://secure.travis-ci.org/manuelvanrijn/node-realurl.png)](http://travis-ci.org/manuelvanrijn/node-realurl)

A simple command-line/module to convert short url's to the original url.

## Getting Started
Install the module with: `npm install realurl -g`

I would recommend installing it globally so you can use it from the command line.

### From the command line

```bash
$ realurl http://goo.gl/BGV9x

Retrieving the real url for: http://goo.gl/BGV9x

Real URL location:
https://github.com/manuelvanrijn/node-realurl

Result has been copied to your clipboard
```

### Within your NodeJS project

```javascript
var realurl = require('realurl');
realurl.get('http://goo.gl/BGV9x', function(result, error) {
   // error = false;
   // result = "http://github.com/manuelvanrijn/node-realurl";
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History

* 2012/10/08 - v0.1.2 - Added copy to clipboard support.
* 2012/10/03 - v0.1.1 - Fixed a bug regarding line endings...
* 2012/10/02 - v0.1.0 - Initial release.

## License

Copyright (c) 2012 Manuel van Rijn - Licensed under the MIT license.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/3b2c11583454014a8437074fa7f0ad84 "githalytics.com")](http://githalytics.com/manuelvanrijn/node-realurl)
