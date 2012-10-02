/*
 * realurl
 * https://github.com/mvanrijn/realurl
 *
 * Copyright (c) 2012 Manuel van Rijn
 * Licensed under the MIT license.
 */

var url       = require('url');
var https     = require('https');
var http      = require('http');

module.exports = {
  get: function(url, callback) {
    if(url === undefined || url === null || url.length < 1)
      return console.log('Please specify an short url to process');

    console.log("\nRetrieving the real url for: " + url);

    if(callback === undefined)
      callback = function() {}
    getUrl(url, callback);
  }
};

function getUrl(link, callback) {
  var src  = url.parse(link);
  var req  = src.protocol === 'https:' ? https : http;

  req.get(src, function (res) {
    // Found: MUST NOT automatically redirect according to the RFC2616 spec's
    if (res.statusCode == 302) {
      callback(res.headers.location);
    }
    // Redirect: Requests between statusCode 300 and 400 (except 302) should be redirected
    else if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
      getUrl(res.headers.location, callback);
    }
    // Unknown short url
    else if (res.statusCode == 404) {
      callback("Unknown short url. Double check it please...");
    }
    else {
      callback(src.href);
    }
  });
}