var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	_id: Number,
	username: String,
	password: String,
	email: String,
  confirmed: Boolean,
	network: [{type: Number, ref: 'Conversation'}],
	requestHistory: [{type: Number, ref: 'Request'}]
});


//Verifies that a passowrd is correct
/**
  *@name Name of User in question.
  *@candidatepw Password in question.
  *@callback Callback function with which you pass along information.
**/
userSchema.statics.verifyPassword = function (name, candidatepw, callback) {
  var exists = null;
  userExists(name,function(bool){
    exists = bool;
    if (exists) {

    var wantedUser = null;

    getUser(name,function(result){
      wantedUser = result;
      if (!(wantedUser.confirmed)) {
          callback(true, false);
          return;
      }

      if ( bcrypt.compareSync(candidatepw, wantedUser.password) ) {
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
/**
  *@userN Name of User in question.
  *@callback Callbacks whether or not user exists.
**/
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

/**
  *@possibleemail Name of email in question.
  *@callback Callbacks whether or not the email is taken.
**/
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
/**
  *@userN Name of User in question.
  *@callback Callbacks whether or not user exists.
**/
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
/**
  *@username Name of User in question.
  *@callback Callbacks the user if it exists in the database.
**/
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

//Creates a new user
/**
  *@name The name you want the new User to have.
  *@password Password of the new User.
  *@emailaddress Email address of new person.
  *@callback Calls back details about the function.
**/
userSchema.statics.createNewUser = function (name, password, emailaddress, callback) {

  User.count({}, function( err, count){
    userExists(name,function(namebool){
      emailTaken(emailaddress, function(emailbool){
        if (namebool){
          callback(null, { istaken: "username" });
        } else if (emailbool) {
          callback(null, { istaken: "email" });
        } else {
          var salt = bcrypt.genSaltSync(10); 
          User.create({
            _id: count,
            username: name,
            password: bcrypt.hashSync(password, salt),
            email: emailaddress,
            confirmed: false,
            network: [],
            friendRequests: [],
            requestHistory: []
          }, function (err){
            callback(null, {istaken: "nottaken", id: count});
          });
        };
      });
    });
  });
}

// Updates confirmed field when user confirms their email address
/**
 *@uid id of user in question.
 *@callback calls back whether or not it is confirmed.
**/
userSchema.statics.confirmEmail = function (uid, callback) {

    User.update({_id: uid}, { $set : { confirmed : true }}, function (err, doc) {
        if (err) {
            callback(err);
        } else {
            callback(null, { confirmed: "True" });
        }
    });
}

var User = mongoose.model('User', userSchema);
module.exports = User;
