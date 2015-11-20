var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var requestSchema = mongoose.Schema({
	_id: Number,
	dinnerTimes: [Number],
	timestamp: Number,
	diningHalls: [String],
	partySize: [Number],
	status: String,
	createdBy: {type: Number, ref: 'User'}
});

var Request = mongoose.model('Request', userSchema);
module.exports.Request = Request;