var mongoose = require("mongoose");

var requestSchema = mongoose.Schema({
	_id: Number,
	dinnerTimes: [Number],
	timestamp: Number,
	diningHalls: [String],
	partySize: [Number],
	status: String,
	createdBy: {type: Number, ref: 'User'}
});

var User = mongoose.model('Request', userSchema);