var assert = require("assert");
var User = require("../models/User");
var Conversation = require("../models/conversations");
var mongoose = require("../models/mongoose");
var Message = require("../models/messages");

mongoose.connect('mongodb://localhost:/test');

describe('User', function()
{
 	beforeEach(function(done)
  {
    //var sampleUser = {: "hello world", "creator": "bob", "_id": 0};
    User.createNewUser("bob", "sii@mit.edu","banana", function(){})
    User.createNewUser("larry", "b@gmail.com","apple", function(){})
    done();
  });

 describe('#createNewUser()', function () {
    
	    it('should create a new user without error', function (done) {
	      User.createNewUser("john","sdfsa@gmail.com","orange", function(err) {
	        assert.deepEqual(err,null);
	        done();
	      });
	    });
	});
});


