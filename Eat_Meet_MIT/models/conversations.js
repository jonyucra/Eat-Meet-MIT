var mongoose = require("mongoose");
var Message = require("./messages");
var User = require("./users");

var conversationSchema = mongoose.Schema({
	_id: Number,
	messages: [{type: Number, ref: 'Message'}]
});

var Conversation = mongoose.model('Conversation', userSchema);


//get_all_messages in the conversation with input of conversation_id
messageSchema.statics.getConversation = function(conversation_id, callback){


model.exports = Conversation;