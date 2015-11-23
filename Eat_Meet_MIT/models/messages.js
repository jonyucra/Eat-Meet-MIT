var mongoose = require("mongoose");
var Conversation = require("../models/conversations");
var User = require("../models/users");


var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: Number, ref: 'User'},
	receiver: {type: Number, ref: 'User'},
	content: String,
	timestamp: Number
});


//get username by userID
messageSchema.statics.getUsername = function(user_id, callback){
	User.findOne({_id:user_id}, function(err, results){
		if(err){
			callback(err,null)
		}
		else{
			callback(null,results.username);
		}
	})
}

/**
* get conversationID with input of user_send_id, user_receive_id
* 
*  @param user_send_id : user_id who sent the message
*  @param user_receive_id : user_id who receives the message
*
*/ 
messageSchema.statics.findConvserationID = function(user_send_id, user_receive_id, callback){
	User.findOne({_id:user_send_id})
	.populate({path:'network'})
	.exec(function(err, user){
		if(err){
			callback(err,null);
		}
		else{
			var Correct_Conv = user.network.filter( function(obj){
				if(obj.user_id_A === user_receive_id || obj.user_id_B === user_receive_id){
					return true;
				}
				else{
					return false;
				}
			})[0];
			callback(null,Correct_Conv._id);
		}
	});
};

// messageSchema.statics.simplefindone = function(conversation_id,callback){
// 	Conversation.findOne({_id:conversation_id})
// 	.populate({path:"user_id_A"})
// 	.exec(function(err, conversation){
// 		if(err){
// 			callback(err,null);
// 		}
// 		else{
// 			callback(null,conversation.user_id_A);
// 		}
// 	});


// 	// Conversation.findOne({_id:conversation_id}, function(err,result){
// 	// 	if(err){
// 	// 		callback(err, null);
// 	// 	}
// 	// 	else{
// 	// 		console.log(err);
// 	// 		console.log(result);
// 	// 		callback(null,result);
// 	// 	}
// 	// });
// };


/**
* create_message with input of user_send_id, user_receive_id
* 
*  @param user_send_id : user_id who sent the message
*  @param user_receive_id : user_id who receives the message
*  @param content : message content
*
*/ 
messageSchema.statics.createMessage = function(user_send_id, user_receive_id, content, callback){
	//step 1 get the new_id 
	Message.find({}, function(err, results){
		var new_message_id = results.length;
		var new_message = {
			_id: new_message_id,
			author: user_send_id,
			receiver: user_receive_id,
			content: content
		}

		Message.create(new_message, function(err,results_add){
      		//console.log(results_add);
      		if(err){
      			callback(err,null);
      		}
      		else{
      		//console.log(results_add);
      		//step 2 find the current conversation_id and push message_id into conversation 
      			User.findOne({_id:user_send_id})
				.populate({path:'network'})
				.exec(function(err, user){
					if(err){
						callback(err,null);
					}
					else{
						var Correct_Conv = user.network.filter( function(obj){
							if(obj.user_id_A === user_receive_id || obj.user_id_B === user_receive_id){
								return true;
							}
							else{
								return false;
							}
						})[0];
						//console.log(Correct_Conv._id);

						Conversation.findOne({_id:Correct_Conv._id},function(err1,results1){
		    				//console.log("err1",err1);
		    				//console.log("results1:",results1);
		    				if(err1) {		    					
		    					callback(err1,null);
		    				}
		    				else{
		    					results1.messages.push(new_message_id);
		    					//console.log("new_message_id",new_message_id);
		    					//console.log("_id",Correct_Conv._id);
		    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages}, function(err2,results2){
		    						//console.log("result2:",results2);
		    						callback(null);
		    					});
		    				}
		    			});
					}
				});
      		}
    	});
	})
};





var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
