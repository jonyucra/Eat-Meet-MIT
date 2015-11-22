var assert = require("assert");
var User = require("../models/User");
var Request = require("../models/requests");
var Conversation = require("../models/conversations");
var mongoose = require("../models/mongoose");
var Message = require("../models/messages");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/mymongodb');

before(function (done){

  var billy = new User({ _id: 0, username: "billy", password: "orange", email: "billy@mit.edu", network: [], friendRequests: [], requestHistory: [5] });
  billy.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var bob = new User({ _id: 1, username: "bob", password: "anana", email: "bob@mit.edu", network: [], friendRequests: [], requestHistory: [4] });
  bob.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var joe = new User({ _id: 2, username: "joe", password: "naranja", email: "joe@mit.edu", network: [], friendRequests: [], requestHistory: [3] });
  joe.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var molly = new User({ _id: 3, username: "molly", password: "choco", email: "molly@mit.edu", network: [], friendRequests: [], requestHistory: [2] });
  molly.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var sarah = new User({ _id: 4, username: "sarah", password: "vanilla", email: "sarah@mit.edu", network: [], friendRequests: [], requestHistory: [1] });
  sarah.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var jess = new User({ _id: 5, username: "jess", password: "slugs", email: "jess@mit.edu", network: [], friendRequests: [], requestHistory: [0] });
  jess.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestzero = new Request({ _id: 0, dinnerTimes: [17,20], timestamp: Date.now(), diningHalls: ["Simmons"], status: "Active", createdBy: 5});
  requestzero.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestone = new Request({ _id: 1, dinnerTimes: [17, 18, 19, 20], timestamp: Date.now(), diningHalls: ["Masseh", "Baker", "McCormick"], status: "Active", createdBy: 4});
  requestone.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requesttwo = new Request({ _id: 2, dinnerTimes: [17, 18, 19, 20], timestamp: Date.now(), diningHalls: ["Simmons", "Baker", "Masseh", "McCormick", "Next"], status: "Active", createdBy: 3});
  requesttwo.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestthree = new Request({ _id: 3, dinnerTimes: [19], timestamp: Date.now(), diningHalls: ["Next"], status: "Active", createdBy: 2});
  requestthree.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestfour = new Request({ _id: 4, dinnerTimes: [17, 18, 19, 20], timestamp: Date.now(), diningHalls: ["Simmons", "Baker", "Next", "Masseh"], status: "Active", createdBy: 1});
  requestfour.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestfive = new Request({ _id: 5, dinnerTimes: [17, 18], timestamp: Date.now(), diningHalls: ["Simmons", "Baker", "Masseh", "McCormick", "Next"], status: "Active", createdBy: 0});
  requestfive.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  done();

});

/*
before(function(){


  //Is there a better way to make sure the docs get added to the databse before the tests run? Perhaps using mongoose save?
  Request.createNewRequest([17, 20],["Simmons"], 11, function(err) {
    Request.createNewRequest([17,18, 19, 20],["Masseh", "Baker", "McCormick"], 14, function(err) {
      Request.createNewRequest([17,18, 19, 20],["Simmons", "Next", "Masseh", "Baker", "McCormick"], 10, function(err) {
        Request.createNewRequest([19],["Next"], 12, function(err) {
          Request.createNewRequest([17,18, 19, 20],["Simmons", "Next", "Masseh", "Baker"], 13, function(err) {
            Request.createNewRequest([17,18],["Simmons", "Next", "Masseh", "Baker", "McCormick"], 15, function(err) {
             // Request.createNewRequest([20,19],["Simmons", "Next"], 0, function(err) {
                //User.createNewUser("sally","s","sally@mit.edu",function(){
                //  User.createNewUser("jonatan","sk8terd00d","jyucra@mit.edu",function(){
                //    User.sendFriendRequest("sally","jonatan",function(){});
                  //});
                //});
             // });
            });
          });
        });
      });
    });
  });

});
*/

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

  /*
  describe('#sendFriendRequest()', function () {

    it('should add to the appropriate friendRequest', function (done) {
      
      User.findByUsername("jonatan", function(err,res){
        assert.equal(res.friendRequests[0],1,"ID should be one");
        done();
      });
      
    });
  });
  */
});



// Request is the module under test
describe('Request', function()
{
  
  // createNewRequest is the method under test.
  describe('#createNewRequest()', function () {
    
    it('should create a new request without error', function (done) {
      Request.createNewRequest(["19","20"],["Simmons", "Next"], "john", function(err) {
        assert.deepEqual(err,null);
        done();
      });
    });
  }); // End describe createNewRequest()

  // getMatches is the method under test.
  
  describe('#getMatch()', function () {
    
    it('should find request with matching parameters', function (done) {

      Request.getMatch("john", function(err,foundrequest) {
        console.log("Found request");
        console.log(foundrequest);
        assert.deepEqual(err,null);
        done();
      });
    });
  }); // End describe getMatch()

});

