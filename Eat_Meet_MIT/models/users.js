var mongoose = require("mongoose");
var Conversation = require('../models/conversations');

var userSchema = mongoose.Schema({
	_id: Number,
	username: String,
	password: String,
	email: String,
	network: [{type: Number, ref: 'Conversation'}],
	friendRequests: [{type: Number, ref: 'User'}],
	requestHistory: [{type: Number, ref: 'Request'}]
});


//Verifies that a passowrd is correct
userSchema.statics.verifyPassword = function (name, candidatepw, callback) {
  var exists = null;
  userExists(name,function(bool){
    exists = bool;
    if (exists) {

    var wantedUser = null;

    getUser(name,function(result){
      wantedUser = result;

      if (candidatepw === wantedUser.password) {
        callback(null, true);
      } else {
        callback(null, false);
      }

    });

  } else{
    callback(null, false);
  }
  });
}

//Checks through all the Users to make sure the user in question exists in the
//database
var userExists = function(userN, callback){
	var exists=null
	var check = User.findOne({username: userN}, function(err, user){
		if(err){
			exists=err;
		}
		else if(user == null){
			exists=false;
		}
		else{
			exists=true;
		}
		callback(exists);
	});
};


// retrieves a user from the database
var getUser = function(possibleuser, callback) {

  var exists = null;

  userExists(possibleuser,function(bool){
    exists = bool;

    if (exists) { 
      var wantedUser = null;
      User.findOne({ username: possibleuser}, function (err, doc){
        wantedUser = doc;
        callback(wantedUser)
      });
    }else{
      callback(null);
    }

  });

}

//Used predominantly for mocha testing.
userSchema.statics.findByUsername = function(username, callback){
  userExists(username, function(resu){
    if(resu){
      getUser(username, function(user){
        callback(null, user);
      });
    }
    else{
      callback({ msg : 'No such user!' });
    }
  });
}

//Adds user who wants to be friends to the friendTorequest's list.
//TODO: add functionality so that if someone sends a request to a person already in
//their friendRequests list that it instead adds them to their network.
userSchema.statics.sendFriendRequest = function(callerName,friendToRequest, callback){
  User.findOne({username:callerName}, function(err, user){
    if(err || user==null){
      callback(true);
    }
    else{
      User.findOne({username:friendToRequest}, function(err, user2){
        if(err){
          callback(err)
        }
        else{
          if(user2.friendRequests.indexOf(user._id)==-1){
            User.update({username:friendToRequest}, {$push:{friendRequests:user._id}},function(err, num){});
            callback(null);
          }
          else{
            callback({message:"Already sent a request to this user"});
          }
        }
      })
    };
  });
};

//This funct both creates a new conversation object between two users and then adds
//that conversation object to both users's networks.
userSchema.statics.acceptFriendRequest = function(requester, name, callback){
  User.findOne({username:requester},function(err, user){
    User.findOne({username:name},function(err, user2){
      Conversation.find({},function(err,conversations){
        Conversation.create({
          _id:conversations.length,
          user_id_A: user._id,
          user_id_B: user2._id,
          messages: []
        },function(err, doc){
          User.update({username:requester},{$push{network:doc._id}},function(err,num){
            User.update({username:name},{$push{network:doc._id}},function(err){
              if(err){
                callback(true)
              }
              else{
                callback(null)
              }
            })
          })
        });
      });
    });
  });
}

//Gets contents of a users pending friend requests.
userSchema.statics.pendingFriendRequests = function(name, callback){
  User.findOne({username:name},function(err, user){
    if(err){
      callback(err)
    }
    else{
      callback(null,user.friendRequests)
    }
  })
}

//Creates a new user
userSchema.statics.createNewUser = function (name, password, emailaddress, callback) {
  
  var exists = null;

  User.count({}, function( err, count){
    userExists(name,function(bool){
      exists = bool;

      if (exists){
        callback({ taken: true });
      } else {
        User.create({
          _id: count,
          username: name,
          password: password,
          email: emailaddress,
          network: [],
          friendRequests: [],
          requestHistory: []
        }, function (err){
          callback(null);
        });
      };
    });
  });
}

var User = mongoose.model('User', userSchema);
module.exports = User;