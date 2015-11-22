var mongoose = require("mongoose");
var Message = require("./messages");
var User = require("./users");


var conversationSchema = mongoose.Schema({
	_id: Number,
	user_id_A: {type: Number, ref:'User'},
	user_id_B: {type: Number, ref:'User'},
	messages: [{type: Number, ref: 'Message'}]
});


//get username by userID
conversationSchema.statics.getUsername = function(user_id, callback){
	User.findOne({_id:user_id}, function(err, resutls){
		if(err){
			callback(err)
		}
		else{
			callback(results.username);
		}
	})
}

//get conversation receiver_id by the input of send_id and conversation_id
conversationSchema.statics.get_receiver_id = function(user_send_id, conversation_id, callback){
	Conversation.findOne({_id:conversation_id}, function(err,result){
		if (err){
			callback(err)
		}
		else{
			if (result.user_id_A === user_send_id)
				callback(result.user_id_B);
			else{
				callback(result.user_id_A);
			}
		}
	});
};

//temp funciton to add conversationSchema for mocha testing
conversationSchema.statics.createNewConv = function (user_id_A, user_id_B, callback) {
	Conversation.find({}, function(err, results){
		var new_conversation_id = results.length;
		var new_conversation= {
				_id: new_conversation_id,
				user_id_A: user_id_A,
				user_id_B: user_id_B,
				messages: []
			};

		Conversation.create(new_conversation, function(err,results_add){
          		callback(null);
        	});
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
	});
};


//get_all_messages in the conversation with the input of two user_ids
conversationSchema.statics.getConversation_UserIDs = function(user_send_id, user_receive_id, callback){
	User.findOne({_id:user_send_id})
	.populate({path:'Conversation'})
	.exec(function(err, Conversation_array){
		if(err){
			callback(err);
		}
		else{
			var Correct_Conv = Conversation_array.filter( function(obj){
				if(obj.user_id_A === user_receive_id || obj.user_id_B === user_receive_id){
					return true;
				}
				else{
					return false;
				}
			})[0];

			Conversation.findOne({_id:Correct_Conv._id})
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
module.exports = Conversation;

