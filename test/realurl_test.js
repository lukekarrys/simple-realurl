var realurl = require('../lib');
var nock    = require('nock');

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

exports['get'] = {
  setUp: function(done) {
    done();
    
    var shortUrl = nock('http://tst.org')
      .defaultReplyHeaders({'location': 'http://testdomain.org/some-long-part'})
      .get('/abc')
      .reply(301);

    var longUrl = nock('http://testdomain.org')
      .get('/some-long-part')
      .reply(200);

    var unknownShortUrl = nock('http://shorturl.org')
      .get('/unknown')
      .reply(404);
  },
  'no or empty url': function(test) {
    console.log = function (str) {
        test.equal(str, 'Please specify an short url to process', 'should ask to specify shorturl for empty string');
    };

    test.expect(3);
    realurl.get('');
    realurl.get();
    realurl.get(null);
    test.done();
  },
  'single redirect': function(test) {
    test.expect(1);
    realurl.get('http://tst.org/abc', function(real_url) {
      test.equal(real_url, 'http://testdomain.org/some-long-part', 'should retrieve the long url');
      test.done();
    });
  },
  'wrong short url': function(test) {
    test.expect(1);

    realurl.get('http://shorturl.org/unknown', function(real_url) {
      test.equal(real_url, 'Unknown short url. Double check it please...', 'should give unkown short url message');
      test.done();
    });
  }
};