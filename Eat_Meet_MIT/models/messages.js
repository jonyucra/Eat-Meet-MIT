var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: Number, ref: 'User'},
	timestamp: Number
});

var Message = mongoose.model('Message', messageSchema);

module.exports.User = User;