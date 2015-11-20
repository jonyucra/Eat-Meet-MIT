var mongoose = require("mongoose");
var Message = require("./messages");
var User = require("./users");

var conversationSchema = mongoose.Schema({
	_id: Number,
	messages: [{type: Number, ref: 'Message'}]
});

//temp funciton to add conversationSchema for mocha testing
conversationSchema.statics.createNewConv = function (ID, callback) {
  Conversation.create({
  	_id: ID
  	following: []
  });
 };


//get_all_messages in the conversation with input of conversation_id
conversationSchema.statics.getConversation_ConvId = function(conversation_id, callback){
	Conversation.findOne({_id:conversation_id})
	.populate({path:'Message'})
	.exec(function(err, message_array){
		if(err){
			callback(err);
		}
		else{
			callback(message_array);
		}
	})
};

//get_all_messages in the conversation with the input of two user_ids
conversationSchema.statics.getConversation_UserIDs = function(user_send_id, user_receive_id, callback){
	User.findOne({_id:user_send_id}, function(err,results){
		
		if (err){
			callback(err)
		}
		else{
			var conversationID = results.network.filter( function(obj){
	            if(obj[0]===user_receive_id){
	              return true;
	            }else{
	              return false;}
	        })[1];
			
			conversationSchema.findOne({_id:conversationID})
			.populate({path:'Message'})
			.exec(function(err, message_array){
				if(err){
					callback(err);
				}
				else{
					callback(message_array);
				}
			});
		}
	});	
};


var Conversation = mongoose.model('Conversation', conversationSchema);
model.exports = Conversation;