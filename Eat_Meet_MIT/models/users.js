var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var userSchema = mongoose.Schema({
	_id: Number,
	username: String,
	password: String,
	email: String,
	network: [{type: Number, ref: 'User'},{type: Number, ref: 'Conversation'}],
	friendRequests: [{type: Number, ref: 'User'}],
	requestHistory: [{type: Number, ref: 'Request'}]

});


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

userSchema.statics.sendFriendRequest = function(callerName,friendToRequest, callback){

  User.findOne({username:friendToRequest}, function(err, user){
    if(err){
      callback(err);
    }
    else if(user==null){
      //TODO: Perhaps think of a better way to handle this
      callback(null);
    }
    else{
      User.findOne({username:callerName}, function(err, user2){
        
      });
    };
  });
};
//Verifies that a password is correct
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

//Creates a new user
userSchema.statics.createNewUser = function (name, password, emailaddress, callback) {
  console.log("Made it to the model")
  var exists = null;

  userExists(name,function(bool){
    exists = bool;

    if (exists){
      console.log("Username is taken");
      callback({ taken: true });
    } else {
      console.log("Adding user to database");
      User.create({
      username: name,
      password: password,
      email: emailaddress,
      network: [],
      friendRequests: [],
      requestHistory: []
      });
      callback(null);
  }

  });

}

var User = mongoose.model('User', userSchema);
module.exports = User;

