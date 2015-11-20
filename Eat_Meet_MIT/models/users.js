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

var User = mongoose.model('User', userSchema);
module.exports.User = User;