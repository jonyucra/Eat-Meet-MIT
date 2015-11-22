var assert = require("assert");
var User = require("../models/users");
var Request = require("../models/requests");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/mymongodb');

// User is the module under test
describe('User', function()
{
  // createNewUser is the method under test.
  describe('#createNewUser()', function () {
    
    it('should create a new user without error', function (done) {
      User.createNewUser("john","orange", "jon@mit.edu", function(err) {
        assert.deepEqual(err,null);
        done();
      });
    });

    it('should recognize username is taken', function (done) {
      User.createNewUser("john","banana", "lol@mit.edu", function(err) {
        assert.deepEqual(err.taken, true);
        done();
      });
    });

  }); // End describe createNewUser()


});

// Request is the module under test
describe('Request', function()
{
  // createNewRequest is the method under test.
  describe('#createNewRequest()', function () {
    
    it('should create a new request without error', function (done) {
      Request.createNewRequest(["20","19"],["Simmons", "Next"], 0, function(err) {
        assert.deepEqual(err,null);
        done();
      });
    });
  }); // End describe createNewRequest()


});