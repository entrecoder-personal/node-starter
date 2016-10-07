
var app = require('../app.js');
var request = require('supertest')(app);

describe('GET /about', function() {
  it('should return 200 OK', function(done) {
    request.get('/about')
    	.expect(200,done);
  });
});

describe('GET /contact', function() {
  it('should return 200 OK', function(done) {
    request.get('/contact')
    	.expect(200,done);
  });
});

describe('GET /help', function() {
  it('should return 200 OK', function(done) {
    request.get('/help')
    	.expect(200,done);
  });
});

describe('GET /privacy', function() {
  it('should return 200 OK', function(done) {
    request.get('/terms')
    	.expect(200,done);
  });
});

describe('GET /terms', function() {
  it('should return 200 OK', function(done) {
    request.get('/terms')
    	.expect(200,done);
  });
});

describe('GET /forgot', function() {
  it('should return 200 OK', function(done) {
    request.get('/forgot')
      .expect(200,done);
  });
});

describe('GET /signin', function() {
  it('should return 200 OK', function(done) {
    request.get('/signin')
      .expect(200,done);
  });
});

describe('GET /signup', function() {
  it('should return 200 OK', function(done) {
    request.get('/signup')
      .expect(200,done);
  });
});