var mongoose = require("mongoose");

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

var emailTaken = function(possibleemail, callback){
  var taken = null;
  var check = User.findOne({email: possibleemail}, function (err, user){

    if (err){
      taken = err;
    } 
    else if (user == null){
      taken = false;
    } else {
      taken = true;
    }
    callback(taken);
  });
}


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
//NOTE: Not used for mvp.
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
            callback(null,{message:"Already sent a request to this user"});
          }
        }
      })
    };
  });
};

//This funct both creates a new conversation object between two users and then adds
//that conversation object to both users's networks.
//MOVED TO CONVERSATIONS

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

  User.count({}, function( err, count){
    userExists(name,function(namebool){
      emailTaken(emailaddress, function(emailbool){
        if (namebool){
          callback(null, { istaken: "username" });
        } else if (emailbool) {
          callback(null, { istaken: "email" });
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
            callback(null, {istaken: "nottaken"});
          });
        };
      });
    });
  });
}

var User = mongoose.model('User', userSchema);
module.exports = User;