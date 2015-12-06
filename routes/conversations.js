var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/users');
var Message = require('../models/messages');
var Conversation = require('../models/conversations');


/*
  Require authentication on ALL access to /request/*
  Clients which are not logged in will receive a 403 error code.
*/
 var requireAuthentication = function(req, res, next) {
   if (!req.currentUser) {
     utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
   } else {
     next();
   }
 };

// Register the middleware handlers above.
router.all('*', requireAuthentication);

/*
  At this point, all requests are authenticated
   Clients must be logged into some account
*/

/*
  GET /messages
  request parameters: currentUser, receiverUser
  Response:
    - success: true if the server succeeded in getting the user's messages 
    for the current conversation 
    - content: on success, an object containing the request made by the user
    - err: on failure, an error message
*/
router.get('/messages', function(req, res) {
    Conversation.getConversation(req.currentUser, req.query.receiverUser, function(err, output, receiverId) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } 
    else {
      Conversation.readMessages(req.currentUser,receiverId, function(err_read){
        if(err_read){
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');          
        }
        else{
          Conversation.lastMessage(req.currentUser,receiverId, function(err_last,output_last){
            if(err_last){
              utils.sendErrResponse(res, 500, 'An unknown error occurred.');                 
            }
            else{
              utils.sendSuccessResponse(res, { messageArray: output, 
              receiverUser: req.query.receiverUser, 
              _id:receiverId,
              last_read_status: output_last.read_status,
              last_message_id: output_last.last_message_id
               });
            }
          })
        }
      });
    }
  });
});


/*
  GET /display_messages
  request parameters: currentUser, current conversation_id
  Response:
    - success: true if the server succeeded in getting the user's messages 
    for the current conversation along with the last message
    - content: on success, an object containing the request made by the user
    - err: on failure, an error message
*/
router.get('/display_messages', function(req, res) {
    Conversation.lastMessage(req.currentUser, req.query.conversation_id, function(err_last, output_last) {
    if (err_last) {
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      Conversation.getConversationByUsernameConvID(req.currentUser,req.query.conversation_id, function(err,output){
        if(err){
          utils.sendErrResponse(res, 500, 'An unknown error occurred.');               
        }
        else{
          utils.sendSuccessResponse(res, { messageArray: output.messageArray, 
          receiverUser: output.receiver_username, 
          last_read_status: output_last.read_status,
          last_message_id: output_last.last_message_id });
        }
      });
    }
  });
});


/*
  Post /create_message
  request parameters: currentUser
  Response:
    - success: true if the server succeeded in creating new message
    - content: on success, an object containing the request made by the user
    - err: on failure, an error message
*/
router.post('/create_message', function(req, res) {
    Message.createMessageByUsernameConvID(req.currentUser,
      req.body.conversation_id,
      req.body.content,     
      function(err, output) {
      if (err) {
        utils.sendErrResponse(res, 500, 'An unknown error occurred.');
      } else {
        utils.sendSuccessResponse(res, {convoId: output});
      }
    });
});

module.exports = router;
