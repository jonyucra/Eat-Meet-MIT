var mongoose = require("mongoose");
var Conversation = require("../models/conversations");
var User = require("../models/users");


var messageSchema = mongoose.Schema({
	_id: Number,
	author: {type: String, ref: 'User'},
	receiver: {type: String, ref: 'User'},
	content: String,
	create_time: {type: Date, default: Date.now},
	receive_time: {type: Date, default:null}
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
	//console.log("IM IN CREATEMESSAGEBYID");
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
	//console.log("IN THE MODEL MAKING MESSAGES");
	Message.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Conversation.get_receiver_id(user_send_id, conversation_id, function(err2, receive_id){
			var user_receive_id = receive_id;
			Message.createMessageByID(user_send_id,user_receive_id,content,callback);
		});
	});
};

// //read conversation and updates the unread number
// messageSchema.statics.readMessages = function(send_username, conversation_id, callback){
// 	Conversation.getUserID(send_username,function(err1, send_id){
// 		Conversation.findOne({_id:conversation_id},function(err2, result_conversation){
// 			if(result_conversation.user_id_A === send_id){
// 				Conversation.update({_id:conversation_id}, {unread_by_user_A:0}, function(err3,results_update3){
// 				 callback(null);
// 				});
// 			}
// 			else{
// 				Conversation.update({_id:conversation_id}, {unread_by_user_B:0}, function(err4,results_update4){
// 				 callback(null);
// 				});
// 			}
// 		});
// 	});
// };

//read conversation and updates the unread number
// messageSchema.statics.readMessages = function(send_username, conversation_id, callback){
// 	Conversation.getUserID(send_username,function(err1, send_id){
// 		Conversation.findOne({_id:conversation_id})
// 		.populate({path:'messages'})
// 		.exec(function(err, result_conversation){
// 			if(result_conversation.user_id_A === send_id){
// 				Conversation.update({_id:conversation_id}, {unread_by_user_A:0}, function(err3,results_update3){
// 					if(result_conversation.length>0){
// 						var conversation_array = result_conversation.messages.filter(function(obj){
// 							if(obj.receiver === send_username){
// 								return true;
// 							}
// 							else{
// 								return false;
// 							}
// 						})
// 						console.log("test_conversation_list:",conversation_array);
// 						if(conversation_arry.length >0){
// 							var update_message = conversation_array[conversation_array.length -1];
// 							Message.update({_id:update_message._id}, {receive_time: Date(Date.now())}, function(err_update, results){
// 								callback(null);
// 							})

// 						}
// 						else{
// 							callback(null);
// 						}
// 					}
// 					else{
// 						callback(null);
// 					}
// 				});
// 			}
// 			else{
// 				Conversation.update({_id:conversation_id}, {unread_by_user_B:0}, function(err4,results_update4){
// 					if(result_conversation.length>0){
// 						var conversation_array = result_conversation.messages.filter(function(obj){
// 							if(obj.receiver === send_username){
// 								return true;
// 							}
// 							else{
// 								return false;
// 							}
// 						})
// 						console.log("test_conversation_list:",conversation_array);
// 						if(conversation_arry.length >0){
// 							var update_message = conversation_array[conversation_array.length -1];
// 							Message.update({_id:update_message._id}, {receive_time: Date(Date.now())}, function(err_update, results){
// 								callback(null);
// 							})

// 						}
// 						else{
// 							callback(null);
// 						}
// 					}
// 					else{
// 						callback(null);
// 					}
// 				});
// 			}
// 		});
// 	});
// };

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
			      //console.log("display output",output);
			      callback(null,friend_names,output);
				}			
			});			
		}
	});
};



var Message = mongoose.model('Message', messageSchema);
module.exports = Message;