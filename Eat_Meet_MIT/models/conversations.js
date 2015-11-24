var mongoose = require("mongoose");
//var Message = require("./messages");
var User = require("./users");


var conversationSchema = mongoose.Schema({
	_id: Number,
	user_id_A: {type: Number, ref:'User'},
	user_id_B: {type: Number, ref:'User'},
	messages: [{type: Number, ref: 'Message'}]
});


//get username by userID
conversationSchema.statics.getUsername = function(user_id, callback){
	User.findOne({_id:user_id}, function(err, results){
		if(err){
			callback(err,null)
		}
		else{
			callback(null,results.username);
		}
	})
}

conversationSchema.statics.getUserID = function(name, callback){
	//console.log("name",name);
	User.findOne({username:name}, function(err, results){
		if(err){
			callback(err,null)
		}
		else{
			console.log("results:",results);
			callback(null,results._id);
		}
	})
}

//get conversation receiver_id by the input of send_id and conversation_id
conversationSchema.statics.get_receiver_id = function(user_send_id, convseration_id, callback){
	Conversation.findOne({_id:convseration_id}, function(err,result){
		if (err){
			callback(err,null)
		}
		else{
			if (result.user_id_A === user_send_id)
				callback(null,result.user_id_B);
			else{
				callback(null,result.user_id_A);
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
          		callback(null,results_add);
        	});
	});
 };

//get_all_messages in the conversation with input of conversation_id
conversationSchema.statics.getConversation_ConvId = function(conversation_id, callback){
	Conversation.findOne({_id:conversation_id})
	.populate({path:'Message'})
	.exec(function(err, conversation){
		if(err){
			callback(err,null);
		}
		else{
			callback(null,conversation.messages);
		}
	});
};


//get_all_messages in the conversation with the input of two user_ids
conversationSchema.statics.getConversation_UserIDs = function(user_send_id, user_receive_id, callback){
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

			Conversation.findOne({_id:Correct_Conv._id})
			.populate({path:'messages'})
			.exec(function(err2, conversation){
				if(err2){
					callback(err2,null);
				}
				else{
					callback(null,conversation.messages);
				}
			});
		}
	});
};

//get_all_messages in the conversation with the input of two usernames
conversationSchema.statics.getConversation = function(send_username, receiver_username, callback){
	//console.log("send_username:",send_username);
	//console.log("receiver_username:",receiver_username);
	Conversation.getUserID(send_username, function(err1,send_id){
		var user_send_id = send_id;
		Conversation.getUserID(receiver_username, function(err2, receive_id){
			var user_receive_id = receive_id;
			Conversation.getConversation_UserIDs(user_send_id,user_receive_id,callback);
		});
	});
};


//get_all_messages in the conversation with the input of two usernames
conversationSchema.statics.getConversationByUsernameConvID = function(send_username, conversation_id, callback){
	Conversation.getUserID(send_username, function(err1,send_id){
		Conversation.get_receiver_id(send_id,conversation_id, function(err2,receiver_id){
			Conversation.getUsername(receiver_id, function(err3, receiver_username){
				Conversation.getConversation_ConvId(conversation_id, function(err4, results){
					if(err4){
						callback(err4,null)
					}
					else{
						var output = {};
						output.receiver_username = receiver_username;
						output.messageArray = results;
						callback(null,output);
					}
				});
			});
		});
	});
};


//TODO: Make it so it won't make a new conversation object between two Users that already have one.
conversationSchema.statics.acceptFriendRequest = function(requester, name, callback){
  User.findOne({username:requester},function(err, user){
    User.findOne({username:name},function(err, user2){
      Conversation.find({},function(err,conversations){
        Conversation.create({
          _id:conversations.length,
          user_id_A: user._id,
          user_id_B: user2._id,
          messages: []
        },function(err, doc){
          User.update({username:requester},{$push:{network:doc._id}},function(err,num){
            User.update({username:name},{$push:{network:doc._id}},function(err){

              if(err){
                callback(true)
              }
              else{
                callback(null)
              }
              
            });
          });
        });
      });
    });
  });
}

//Get's all people in your network
conversationSchema.statics.getPeopleInNetwork = function(username,callback){
  console.log("IN GETPEOPLE IN NETWORK FUNCT");
	User.findOne({username:username})
  .populate({path:"network"})
  .exec(function(err, user){
    if(err){
      callback(err, null)
    }
    else{
      var receiver_ids = user.network.map(function(obj){
        if (obj.user_id_A === user._id){
          return obj.user_id_B;
        }
        else{
          return obj.user_id_A;
        }
      });
      console.log("THE IDS:",receiver_ids)
    }
    console.log("STILL THE IDS?",receiver_ids)
    User.find({_id:{$in: receiver_ids}}, function(err,users){
      console.log("USERS:",users);
      var names = [];
      users.forEach(function(obj){
        names=names.concat(obj.username);
      })
      console.log("NAMES:",names);
      callback(null, names);
      });
  });
}



var Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
