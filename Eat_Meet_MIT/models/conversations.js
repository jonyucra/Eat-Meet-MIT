var mongoose = require("mongoose");

var conversationSchema = mongoose.Schema({
	_id: Number,
	messages: [{type: Number, ref: 'Message'}]
});

var User = mongoose.model('Conversation', userSchema);