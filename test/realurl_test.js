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

    done();
  },
  'empty url': function(test) {
    test.expect(2);

    realurl.get('', function(result, error) {
      test.equal(error, true, 'should set error to true');
      test.equal(result, 'Please specify an short url to process for example:\n\n\tbin/realurl http://goo.gl/BGV9x', 'should ask to specify shorturl for empty string');
      
      test.done();
    });
  },
  'no url specified': function(test) {
    test.expect(2);

    realurl.get(function(result, error) {
      test.equal(error, true, 'should set error to true');
      test.equal(result, 'Please specify an short url to process for example:\n\n\tbin/realurl http://goo.gl/BGV9x', 'should ask to specify shorturl for empty string');
      
      test.done();
    });
  },
  'null url specified': function(test) {
    test.expect(2);

    realurl.get(null, function(result, error) {
      test.equal(error, true, 'should set error to true');
      test.equal(result, 'Please specify an short url to process for example:\n\n\tbin/realurl http://goo.gl/BGV9x', 'should ask to specify shorturl for empty string');
      
      test.done();
    });
  },
  'single redirect': function(test) {
    test.expect(2);

    realurl.get('http://tst.org/abc', function(result, error) {
      test.equal(error, false, 'should set error to false');
      test.equal(result, 'http://testdomain.org/some-long-part', 'should retrieve the long url');
      
      test.done();
    });
  },
  'wrong short url': function(test) {
    test.expect(2);

    realurl.get('http://shorturl.org/unknown', function(result, error) {
      test.equal(error, true, 'should set error to true');
      test.equal(result, 'Unknown short url. Double check it please...', 'should give unkown short url message');
      
      test.done();
    });
  }
};