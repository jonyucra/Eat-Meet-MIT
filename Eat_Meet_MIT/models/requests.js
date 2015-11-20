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

var Request = mongoose.model('Request', requestSchema);
module.exports.Request = Request;