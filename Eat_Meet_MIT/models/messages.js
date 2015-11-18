var mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: Number, ref: 'User'},
	timestamp: Number
});

var User = mongoose.model('Message', userSchema);