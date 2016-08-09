var realurl = require('../lib')
var nock = require('nock')

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.get = {
  setUp: function (done) {
    nock('http://tst.org')
      .defaultReplyHeaders({'location': 'http://testdomain.org/some-long-part'})
      .get('/abc')
      .reply(301)

    nock('http://testdomain.org')
      .get('/some-long-part')
      .reply(200)

    nock('http://shorturl.org')
      .get('/unknown')
      .reply(404)

    done()
  },
  'empty url': function (test) {
    test.expect(3)

    realurl.get('', function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'Please specify a short url', 'should ask to specify shorturl')

      test.done()
    })
  },
  'no url specified': function (test) {
    test.expect(3)

    realurl.get(function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'Please specify a short url', 'should ask to specify shorturl')

      test.done()
    })
  },
  'null url specified': function (test) {
    test.expect(3)

    realurl.get(null, function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'Please specify a short url', 'should ask to specify shorturl')

      test.done()
    })
  },
  'single redirect': function (test) {
    test.expect(2)

    realurl.get('http://tst.org/abc', function (error, result) {
      test.equal(error, null, 'error should be null')
      test.equal(result, 'http://testdomain.org/some-long-part', 'should retrieve the long url')

      test.done()
    })
  },
  'wrong short url': function (test) {
    test.expect(3)

    realurl.get('http://shorturl.org/unknown', function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'URL resulted in a 404', 'should give unkown short url message')

      test.done()
    })
  },
  'allow options object': function (test) {
    test.expect(3)

    realurl.get('http://shorturl.org/unknown', {agent: false}, function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'URL resulted in a 404', 'should give unkown short url message')

      test.done()
    })
  },
  'handle dns errors': function (test) {
    test.expect(3)

    realurl.get('http://horse.bananana', function (error, result) {
      test.equal(error instanceof Error, true, 'error should be an instanceof Error')
      test.equal(result, null, 'result should be null')
      test.equal(error.message, 'getaddrinfo ENOTFOUND horse.bananana horse.bananana:80', 'should give ENOTFOUND message')

      test.done()
    })
  }
}
