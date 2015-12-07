var mongoose = require("mongoose");
var Conversation = require("../models/conversations");
var User = require("../models/users");


var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: String, ref: 'User'},
	receiver: {type: String, ref: 'User'},
	content: String,
	create_time: {type: Date, default: Date.now},
	display_time: String,
	receive_time: {type: Date, default: null}
});




/**
   * Public function. getUserID  get UserID by the input of username
   * @param {String} username - A usesr name
   * @param {function} callback - Callback function
**/
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
	* Public function. findConvserationID  get conversationID with input of user_send_id, user_receive_id
	* @param {Number} user_send_id - user_id who sent the message
	* @param {Number} user_receive_id - user_id who receives the message
	* @param {function} callback - Callback function
**/
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


/**
	* Public function. createMessageByID  create new message with the inputs of sender's and receiver's user_ids
	* @param {Number} user_send_id - user_id who sends the message
	* @param {Number} user_receive_id - user_id who receives the message
	* @param {String} content - content of the message
	* @param {function} callback - Callback function
**/
messageSchema.statics.createMessageByID = function(user_send_id, user_receive_id, content, callback){
	//step 1 get the new_id 
	User.findOne({_id:user_send_id}, function(err_s, result_send){
		var send_username = result_send.username;
		User.findOne({_id:user_receive_id}, function(err_r, result_receive){
			var receive_username = result_receive.username;
			Message.find({}, function(err, results){
				//get the display time for the message
				var display_time = Date().substring(4,7)+"-"+Date().substring(8,10)+"-"+Date().substring(11,21);
				var new_message_id = results.length;
				var new_message = {
					_id: new_message_id,
					author: send_username,
					receiver: receive_username,
					content: content,
					display_time: display_time
				}
				Message.create(new_message, function(err,results_add){
		      		if(err){
		      			callback(err,null);
		      		}
		      		else{
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

								Conversation.findOne({_id:Correct_Conv._id},function(err1,results1){
				    				if(err1) {		    					
				    					callback(true,null);
				    				}
				    				else{
				    					results1.messages.push(new_message_id);
				    					if (results1.user_id_A === user_send_id){
				    						if (results1.unread_by_user_B>0){
						    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages, unread_by_user_B: results1.unread_by_user_B +1, unread_by_user_A:0 }, function(err2,results2){
						    						callback(null,Correct_Conv._id);
						    					});				    							
				    						}
				    						else{
						    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages, unread_by_user_B: 1, unread_by_user_A:0}, function(err2,results2){
						    						callback(null,Correct_Conv._id);
						    					});					    							
				    						}
				    					}
				    					else {
				    						if (results1.unread_by_user_A>0){
						    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages, unread_by_user_A: results1.unread_by_user_A +1, unread_by_user_B:0 }, function(err2,results2){
						    						callback(null,Correct_Conv._id);
						    					});				    							
				    						}
				    						else{
						    					Conversation.update({_id:Correct_Conv._id}, {messages:results1.messages, unread_by_user_A: 1, unread_by_user_B:0}, function(err2,results2){
						    						callback(null,Correct_Conv._id);
						    					});					    							
				    						}				    						
				    					}				
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


/**
	* Public function. createMessage  create new messages by sender and receiver's username
	* @param {String} send_username - user namne who sends the message
	* @param {String} receiver_username - user name who receives the message
	* @param {String} content - content of the message
	* @param {function} callback - Callback function
**/
messageSchema.statics.createMessage = function(send_username, receiver_username, content, callback){
	Message.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Message.getUserID(receiver_username, function(err2, receive_id){
			var user_receive_id = receive_id;
			Message.createMessageByID(user_send_id,user_receive_id,content,callback);
		});
	});
};


/**
	* Public function. createMessageByUsernameConvID  create new messages by sender and receiver's username
	* @param {String} send_username - user namne who sends the message
	* @param {Number} conversation_id - user name who receives the message
	* @param {String} content - content of the message
	* @param {function} callback - Callback function
**/
messageSchema.statics.createMessageByUsernameConvID = function(send_username, conversation_id, content, callback){
	Message.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Conversation.get_receiver_id(user_send_id, conversation_id, function(err2, receive_id){
			var user_receive_id = receive_id;
			Message.createMessageByID(user_send_id,user_receive_id,content,callback);
		});
	});
};



/**
	* Public function. getLastMessageInNetwork  get all the last messages from a user's network with the input of username
	* @param {String} username - A user name we want to find his last messages in his network
	* @param {function} callback - Callback function
**/
messageSchema.statics.getLastMessageInNetwork = function(username,callback){
	User.findOne({username:username})
	.populate({path:"network"})
	.exec(function(err, user){
		if(err){
			callback(err,null);
		}
		else{


			var last_messsage_ids = user.network.map(function(obj){
				if(obj.messages.length===0){
					return -1;
				}
				else{
					return obj.messages[obj.messages.length-1];
				}
			});

			var unread_message = {};

			user.network.forEach(function(obj){
				if(obj.messages.length>0){
					if(obj.user_id_A===user._id){
						unread_message[obj.messages[obj.messages.length-1]]=obj.unread_by_user_A;
					}
					else{
						unread_message[obj.messages[obj.messages.length-1]]=obj.unread_by_user_B;
					}					
				}
			});


			Message.find({_id:{$in: last_messsage_ids}})
			.sort({"_id": -1})
			.exec(function(err_message, last_message_array){
				if(err_message){
					callack(err_message,null);
				}
				else{
			      var friend_names = [];
			      var output = []
			      last_message_array.forEach(function(obj){
			      	if (obj.author === username){
			      		friend_names = friend_names.concat(obj.receiver);
			      		output = output.concat({friend_name:obj.receiver, last_messasge:obj, unread: unread_message[obj._id] });
			      	}
			      	else{
			      		friend_names = friend_names.concat(obj.author);
			      		output = output.concat({friend_name:obj.author, last_messasge:obj, unread: unread_message[obj._id] });
			      	}
			      });
			      callback(null,friend_names,output);
				}			
			});			
		}
	});
};



var Message = mongoose.model('Message', messageSchema);
module.exports = Message;