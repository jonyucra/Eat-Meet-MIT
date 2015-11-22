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

  describe('#sendFriendRequest()', function () {

    it('should add to the appropriate friendRequest', function (done) {
      User.createNewUser("sally","s","sally@mit.edu",function(){
        User.createNewUser("jonatan","sk8terd00d","jyucra@mit.edu",function(){
          User.sendFriendRequest("sally","jonatan",function(){
            User.findByUsername("jonatan", function(err,res,done){
        console.log(err)
        console.log("-----")
        console.log(res);
        assert.equal(res.friendRequests[0],1,"ID should be one");
        done()
            });
          });
        });
      });
      
      
    });
  });
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