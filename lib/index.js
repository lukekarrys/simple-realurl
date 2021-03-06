/*
 * realurl
 * https://github.com/lukekarrys/simple-realurl
 *
 * Copyright (c) 2012 Manuel van Rijn
 * Copyright (c) 2012-2016 Luke Karrys
 * Licensed under the MIT license.
 */

var url = require('url')
var https = require('https')
var http = require('http')
var merge = require('lodash.merge')

function getUrl (href, options, callback) {
  var src = url.parse(href)
  var req = src.protocol === 'https:' ? https : http

  merge(src, options)

  var getReq = req.get(src, function (res) {
    var resSrc = url.parse(res.headers.location || '')
    // Found: MUST NOT automatically redirect according to the RFC2616 spec's
    if (res.statusCode === 302) {
      // Some sites give a 302 with a location of '/'.
      // That is not helpful so we parse the header location
      // and if it has a hostname, we use that, if not
      // then we use the original src href
      callback(null, resSrc.host ? resSrc.href : src.href)
    } else if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
      // Redirect: Requests between statusCode 300 and 400 (except 302) should be redirected
      getUrl(res.headers.location, options, callback)
    } else if (res.statusCode === 404) {
      // Unknown short url
      callback(new Error('URL resulted in a 404'), null)
    } else {
      // All fine, return the final href
      callback(null, src.href)
    }
  })

  // catches DNS errors, thanks:
  // http://stackoverflow.com/questions/21662619/how-to-catch-getaddrinfo-enotfound
  getReq.on('error', function (error) {
    callback(error)
  })
}

module.exports = {
  get: function (url, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = null
    }

    if (typeof url === 'function') {
      callback = url
      url = null
    }

    if (typeof url !== 'string' || url.length < 1) {
      return callback(new Error('Please specify a short url'), null)
    }

    getUrl(url, options, callback)
  }
}
