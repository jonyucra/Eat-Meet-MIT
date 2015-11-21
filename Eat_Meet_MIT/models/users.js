var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var userSchema = mongoose.Schema({
	_id: Number,
	username: String,
	password: String,
	email: String,
	network: [[{type: Number, ref: 'User'},{type: Number, ref: 'Conversation'}]],
	friendRequests: [{type: Number, ref: 'User'}],
	requestHistory: [{type: Number, ref: 'Request'}],

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

userSchema.statics.sendFriendRequest = function(callerName,friendToRequest, callback){

	User.findOne({username:friendToRequest}, function(err, user){
		if(err){
			callback(err);
		};
		else if(user==null){
			//TODO: Perhaps think of a better way to handle this
			callback(null);
		};
		else{
			User.findOne({username:callerName}, function(err, user2){
				
			});
		};
	});
};

var User = mongoose.model('User', userSchema);
module.exports.User = User;

