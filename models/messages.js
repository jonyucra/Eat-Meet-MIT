var mongoose = require("mongoose");
var Conversation = require("../models/conversations");
var User = require("../models/users");


var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: String, ref: 'User'},
	receiver: {type: String, ref: 'User'},
	content: String,
	timestamp: Number
});


//get username by userID
// messageSchema.statics.getUsername = function(user_id, callback){
// 	User.findOne({_id:user_id}, function(err, results){
// 		if(err){
// 			callback(err,null)
// 		}
// 		else{
// 			callback(null,results.username);
// 		}
// 	})
// }

//create getMessage for middleware
 messageSchema.statics.getMessage = function(username, messageID, callback) {
  User.findOne({username:username}, function(err,results){
    if(!err){
      Message.findOne({_id:messageID}, function(err1,results_message){
        if(!err1){
          var message = results_message;
          callback(null,message);
        } else{
          callback({ msg : 'Invalid tweet. '});
        }
      })
    } else{
      callback({msg : 'Invalid user. '});
    }
  });
};




//get userID by userName
messageSchema.statics.getUserID = function(username, callback){
	User.findOne({username:username}, function(err, results){
		if(err){
			callback(err,null)
		}
		else{
			callback(null,results._id);
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
messageSchema.statics.createMessageByID = function(user_send_id, user_receive_id, content, callback){
	//step 1 get the new_id 
	console.log("IM IN CREATEMESSAGEBYID");
	User.findOne({_id:user_send_id}, function(err_s, result_send){
		var send_username = result_send.username;
		User.findOne({_id:user_receive_id}, function(err_r, result_receive){
			var receive_username = result_receive.username;
			Message.find({}, function(err, results){
				var new_message_id = results.length;
				var new_message = {
					_id: new_message_id,
					author: send_username,
					receiver: receive_username,
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
				    					callback(true,null);
				    				}
				    				else{
				    					results1.messages.push(new_message_id);
				    					//console.log("new_message_id",new_message_id);
				    					//console.log("_id",Correct_Conv._id);
				    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages}, function(err2,results2){
				    						//console.log("result2:",results2);
				    						callback(null,Correct_Conv._id);
				    					});
				    				}
				    			});
							}
						});
		      		}
		    	});
			});
		});
	});
};

//create new messages by sender and receiver's username
messageSchema.statics.createMessage = function(send_username, receiver_username, content, callback){
	Message.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Message.getUserID(receiver_username, function(err2, receive_id){
			var user_receive_id = receive_id;
			Message.createMessageByID(user_send_id,user_receive_id,content,callback);
		});
	});
};

//create new messages by sender and receiver's username
messageSchema.statics.createMessageByUsernameConvID = function(send_username, conversation_id, content, callback){
	console.log("IN THE MODEL MAKING MESSAGES");
	Message.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Conversation.get_receiver_id(user_send_id, conversation_id, function(err2, receive_id){
			var user_receive_id = receive_id;
			Message.createMessageByID(user_send_id,user_receive_id,content,callback);
		});
	});
};




var Message = mongoose.model('Message', messageSchema);
module.exports = Message;