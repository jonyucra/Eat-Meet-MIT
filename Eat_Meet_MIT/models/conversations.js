var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var conversationSchema = mongoose.Schema({
	_id: Number,
	messages: [{type: Number, ref: 'Message'}]
});

var Conversation = mongoose.model('Conversation', userSchema);

module.exports.Conversation = Conversation;