var assert = require("assert");
var User = require("../models/users");
var Request = require("../models/requests");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/mymongodb');

//Before creating database
before(function(){

  //Is there a better way to make sure the docs get added to the databse before the tests run? Perhaps using mongoose save?
  Request.createNewRequest([17, 20],["Simmons"], 11, function(err) {
    Request.createNewRequest([17,18, 19, 20],["Masseh", "Baker", "McCormick"], 14, function(err) {
      Request.createNewRequest([17,18, 19, 20],["Simmons", "Next", "Masseh", "Baker", "McCormick"], 10, function(err) {
        Request.createNewRequest([19],["Next"], 12, function(err) {
          Request.createNewRequest([17,18, 19, 20],["Simmons", "Next", "Masseh", "Baker"], 13, function(err) {
            Request.createNewRequest([17,18],["Simmons", "Next", "Masseh", "Baker", "McCormick"], 15, function(err) {
              Request.createNewRequest([20,19],["Simmons", "Next"], 0, function(err) {
              });
            });
          });
        });
      });
    });
  });

});

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
      Request.createNewRequest(["17","18"],["Masseh", "Baker"], 0, function(err) {
        assert.deepEqual(err,null);
        done();
      });
    });
  }); // End describe createNewRequest()

  // getMatches is the method under test.
  describe('#getMatches()', function () {
    
    it('should find request with matching parameters', function (done) {

      Request.getMatches([20,19],["Simmons", "Next"], function(err,docs) {
        console.log("PRINTING DOCS");
        console.log(docs);
        assert.deepEqual(err,null);
        done();
      });
    });
  }); // End describe createNewRequest()



});