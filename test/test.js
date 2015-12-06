var assert = require("assert");
var User = require("../models/users");
var Request = require("../models/requests");
var Conversation = require("../models/conversations");
var Message = require("../models/messages");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:/mymongodb');

before(function (done){

  var billy = new User({ _id: 0, username: "billy", password: "orange", email: "billy@mit.edu", network: [0], friendRequests: [], requestHistory: [5] });
  billy.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var bob = new User({ _id: 1, username: "bob", password: "anana", email: "bob@mit.edu", network: [0], friendRequests: [], requestHistory: [4] });
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

  var sophie = new User({ _id: 6, username: "sophie", password: "trees", email: "sophie@mit.edu", network: [], friendRequests: [], requestHistory: [] });
  sophie.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var seth = new User({ _id: 7, username: "seth", password: "orange", email: "seth@mit.edu", network: [0], friendRequests: [], requestHistory: [5] });
  seth.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var zeke = new User({ _id: 8, username: "zeke", password: "orange", email: "zeke@mit.edu", network: [0], friendRequests: [], requestHistory: [5] });
  zeke.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestzero = new Request({ _id: 0, dinnerTimes: [17,20], timestamp: Date.now(), diningHalls: ["Simmons"], status: "pending", createdBy: 5});
  requestzero.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestone = new Request({ _id: 1, dinnerTimes: [17, 18, 19, 20], timestamp: Date.now(), diningHalls: ["Masseh", "Baker", "McCormick"], status: "pending", createdBy: 4});
  requestone.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requesttwo = new Request({ _id: 2, dinnerTimes: [17], timestamp: Date.now(), diningHalls: ["Next"], status: "pending", createdBy: 3});
  requesttwo.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestthree = new Request({ _id: 3, dinnerTimes: [19], timestamp: Date.now(), diningHalls: ["Next"], status: "pending", createdBy: 2});
  requestthree.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestfour = new Request({ _id: 4, dinnerTimes: [18, 19, 20], timestamp: Date.now(), diningHalls: ["Simmons", "Baker", "Next", "Masseh"], status: "pending", createdBy: 1});
  requestfour.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  var requestfive = new Request({ _id: 5, dinnerTimes: [19, 18], timestamp: Date.now(), diningHalls: ["Simmons", "Baker", "Masseh", "McCormick", "Next"], status: "pending", createdBy: 0});
  requestfive.save(function (err) {
    if (err) // ...
    console.log('meow');
  });

  done();

});

// User is the module under test
describe('User', function()
{

  // createNewUser is the method under test.
  describe('#createNewUser()', function () {
    
    it('should create a new user without error', function (done) {
      User.createNewUser("john","orange", "jon@mit.edu", function (err, exists) {
        assert.deepEqual(exists.istaken,"nottaken");
        done();
      });
    });

    it('should recognize username is taken', function (done) {
      User.createNewUser("john","banana", "lol@mit.edu", function (err, exists) {
        assert.deepEqual(exists.istaken, "username");
        done();
      });
    });

    it('should recognize email is taken', function (done) {
      User.createNewUser("notjohn","banana", "jon@mit.edu", function (err, exists) {
        assert.deepEqual(exists.istaken, "email");
        done();
      });
    });

  }); // End describe createNewUser()

  describe('#findByUsername', function (done) {
    
    it('should find an user without error', function (done) {
      User.findByUsername("john", function(err, result) {
        assert.deepEqual(result.username,"john");
        done();
      });
    });

    it('should recognize that the user does not exist', function (done) {
      User.findByUsername("notjohn", function(err, result) {
        assert.deepEqual(err.msg, "No such user!");
        done();
      });
    });

  }); // End describe findByUsername()

});



// Request is the module under test
describe('Request', function()
{
  
  // createNewRequest is the method under test.
  describe('#createNewRequest()', function () {
    
    it('should create a new request without error', function (done) {
      Request.createNewRequest(["19","20"],["Simmons", "Next"], "john", function (err, msg) {
        assert.deepEqual(msg, "New request created.");
        done();
      });
    });
  }); // End describe createNewRequest()

  // cancelRequest is the method under test.
  describe('#cancelRequest()', function () {
    
    it('should cancel a request without error', function (done) {
      Request.cancelRequest("john", function (err, msg) {
        assert.deepEqual(msg, "Request has been cancelled.");
        done();
      });
    });
  }); // End describe cancelRequest()

  // getMatch is the method under test.
  describe('#getMatch()', function () {
    
    it('should recognize my latest request is inactive', function (done) {

      Request.getMatch("john", function(err, foundrequest, matchingrequest, emailbool, msg) {
        assert.deepEqual(msg,"You have no requests.");
        done();
      });
    });

    it('should recognize I have no request history', function (done) {

      Request.getMatch("sophie", function(err,foundrequest, matchingrequest, emailbool, msg) {
        assert.deepEqual(msg, "You have no request history.");
        done();
      });
    });

    it('should recognize there is no one to match you with.', function (done) {

      Request.getMatch("molly", function(err,foundrequest, matchingrequest, emailbool, msg) {
        assert.deepEqual(msg, "There is no request to match you with yet.");
        done();
      });
    });

    it('should match you with someone.', function (done) {

      Request.getMatch("jess", function(err,foundrequest, matchingrequest, emailbool, msg) {
        assert.deepEqual(msg, "You have been matched.");
        done();
      });
    });

    it('should recognize you already have a match.', function (done) {

      Request.getMatch("jess", function(err,foundrequest, matchingrequest, emailbool, msg) {
        assert.deepEqual(msg, "You already have a match.");
        done();
      });
    });

  }); // End describe getMatch()

  // cancelAllRequests is the method under test.
  describe('#cancelAllRequests()', function () {
    
    it('should cancel all requests', function (done) {
      Request.cancelAllRequests(function (err, msg) {
        assert.deepEqual(msg, "All requests have been cancelled.");
        done();
      });
    });
  }); // End describe cancelAllRequests()  

});


// Conversation is the module under test
describe('Conversation', function()
{
  
  // createNewConv is the method under test.
  describe('#createNewConv()', function () {
    
    it('should create a new conversation without error', function (done) {
      Conversation.createNewConv(0,1, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  }); 


    // getUsername is the method under test.
  describe('#getUserID()', function () {
    
    it('should get a getUserID without error', function (done) {
      Conversation.getUserID("billy", function(err,results) {
        assert.deepEqual(results,0);
        console.log(results);
        done();
      });
    });
  }); 

    // getUsername is the method under test.
  describe('#get_receiver_id()', function () {
    
    it('should get a get_receiver_id without error', function (done) {
      Conversation.get_receiver_id(0,0, function(err,results) {
        assert.deepEqual(results,1);
        console.log(results);
        done();
      });
    });
  });


    // getConversation_ConvId is the method under test.
  describe('#getConversation_ConvId()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.getConversation_ConvId(0, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  }); 


    // getConversation_ConvId is the method under test hold up this test later!!
    // HOLD UP FOR THE TEST JUST FOR NOW!!!!!!
    //NEED a function from network to add a conversation id in user_db

  describe('#getConversation_UserIDs()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.getConversation_UserIDs(0,1, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  });

  describe("#acceptFriendRequest()", function () {

    it('should successfully make a conversation and alter the User docs',function (done) {
      Conversation.acceptFriendRequest("seth","zeke",function(err){
        Conversation.findOne({_id:1},function(err,doc){
          assert.equal(doc._id,1);
          assert.equal(doc.messages.length,0);
          assert.equal(doc.user_id_B,8);
          assert.equal(doc.user_id_A,7);
          done();
        });
      });
    });
      

  });

});


// Message is the module under test
describe('Message', function()
{
  
  // // getUsername is the method under test.
  // describe('#getUsername()', function () {
    
  //   it('should get a Username without error', function (done) {
  //     Message.getUsername(0, function(err,results) {
  //       assert.deepEqual(err,null);
  //       console.log(results);
  //       done();
  //     });
  //   });
  // }); 

  // createMessage is the method under test.
  describe('#createMessageByID()', function () {
    
    it('should create new message without error', function (done) {
      Message.createMessageByID(0, 1, 'hello!',function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  }); 

  describe('#createMessageByID()2', function () {
    
    it('should create new message without error', function (done) {
      Message.createMessageByID(0, 1, 'hello dear!',function(err,results) {
        assert.deepEqual(err,null);
        assert.deepEqual(results,0);
        console.log(results);
        done();
      });
    });
  }); 

  describe('#createMessage()3', function () {
    
    it('should create new message without error', function (done) {
      Message.createMessage("billy", "bob", 'hey wazup',function(err,results) {
        assert.deepEqual(err,null);
        assert.deepEqual(results,0);
        console.log(results);
        done();
      });
    });
  }); 

  //   describe('#createMessage()4', function () {
    
  //   it('should create new message without error', function (done) {
  //     Message.createMessage("bob", "billy", 'hey yo',function(err,results) {
  //       assert.deepEqual(err,null);
  //       assert.deepEqual(results,0);
  //       console.log(results);
  //       done();
  //     });
  //   });
  // });

      // lastMessage is the method under test.
  describe('#lastMessage()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.lastMessage('bob',0, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  });  


      // readMessages is the method under test.
  describe('#readMessages()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.readMessages('bob',0, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  }); 

      // lastMessage is the method under test.
  describe('#lastMessage2()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.lastMessage('bob',0, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  });   


      // getConversation_ConvId is the method under test.
  describe('#getConversation_ConvId()', function () {
    
    it('should get a whole conversation messages array without error', function (done) {
      Conversation.getConversation_ConvId(0, function(err,results) {
        assert.deepEqual(err,null);
        console.log(results);
        done();
      });
    });
  }); 

      // getConversation_ConvId is the method under test.
  describe('#getLastMessageInNetwork()', function () {
    
    it('should get a whole getLastMessageInNetwork array without error', function (done) {
      Message.getLastMessageInNetwork("bob", function(err,results1,results2) {
        assert.deepEqual(err,null);
        console.log(results1);
        console.log(results2);
        done();
      });
    });
  }); 

});

//Clears DB after every run
after(function (done) {
  db.connection.db.dropDatabase(function(){
    done();
  });
});
