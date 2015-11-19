var mongoose = require("mongoose");
var Conversation = require("./conversations");
var Users = require("./users");

var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: Number, ref: 'User'},
	receiver: {type: Number, ref: 'User'},
	content: String,
	timestamp: Number
});

/**
* get conversationID with input of user_send_id, user_receive_id
* 
*  @param user_send_id : user_id who sent the message
*  @param user_receive_id : user_id who receives the message
*
*/ 
messageSchema.statics.findConvserationID = function(user_send_id, user_receive_id, callback){
	this.
}


/**
* create_message with input of user_send_id, user_receive_id
* 
*  @param user_send_id : user_id who sent the message
*  @param user_receive_id : user_id who receives the message
*  @param content : message content
*
*/ 
messageSchema.statics.createMessage = function(user_send_id, user_receive_id, conversation_id, content, callback){
	//step 1 get the new_id 
	this.find({}, function(err, results){
		if(results.length>=0){

		}
	})
};




var Message = mongoose.model('Message', userSchema);
module.exports = Message;