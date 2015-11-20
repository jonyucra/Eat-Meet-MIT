var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	_id: Number,
	username: String,
	password: String,
	email: String,
	network: [[{type: Number, ref: 'User'},{type: Number, ref: 'Conversation'}]],
	friendRequests: [{type: Number, ref: 'User'}],
	requestHistory: [{type: Number, ref: 'Request'}],

});

var usernameExists = function(possible_username, callback) { 
  var exists = null;

  User.findOne({ username: possible_username}, function (err, doc){
    if(err){
      callback(err)
    }else if(doc){ 
      exists = true;
      callback(exists);
    }else{
      exists = false;
      callback(exists);
    }
  });

}

var emailExists = function(possible_email, callback) { 
  var exists = null;

  User.findOne({ email: possible_email}, function (err, doc){
    if(err){
      callback(err)
    }else if(doc){ 
      exists = true;
      callback(exists);
    }else{
      exists = false;
      callback(exists);
    }
  });

}

// retrieves a user from the database
var getUserByUsername = function(possible_username, callback) {

  var exists = null;

  usernameExists(possible_username,function(bool){
    exists = bool;

    if (exists) { 
      var wantedUser = null;
      User.findOne({ username: possible_username}, function (err, doc){
        wantedUser = doc;
        callback(wantedUser)
      });
    }else{
      callback(null);
    }

  });

}

//Finds a user given their username. If the user does not exist, handles the request accordingly
userSchema.statics.findByUsername = function (name, callback) {
  var exists = null;

  usernameExists(name,function(bool){
    exists = bool;
    if(exists){
      var wantedUser = null;

      getUserByUsername(name,function(result){
        wantedUser = result;
        callback(null, wantedUser);
      });

    }else{
      callback({ msg : 'No such user!' });
    }
  });

}

//Verifies that a passowrd is correct
userSchema.statics.verifyPassword = function (name, candidatepw, callback) {
  var exists = null;
  
  usernameExists(name,function(bool){
    exists = bool;
    if (exists) {

    var wantedUser = null;

    getUserByUsername(name,function(result){
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
userSchema.statics.createNewUser = function (name, email, password, callback) {
  
  var exists_name = null;
  var exists_email = null;

  usernameExists(name,function(bool_name){
    exists_name = bool_name;
    
	   	emailExists(email, function(bool_email){
	    	exists_email = bool_email
    	    if (exists_name || exists_email){
  				callback({ taken: true });
			} 
			else {
    			User.find({}, function(err, results){
					var User_id = results.length;
					var New_User = {
						_id: User_id,
						author: user_send_id,
						receiver: user_receive_id,
						content: content
						network: [],
						friendRequests: [],
						requestHistory: [],
					};
					User.create(New_User);
					callback(null);
        		});	
		  	}
	    });
  });

};


var User = mongoose.model('User', userSchema);
model.exports = User;