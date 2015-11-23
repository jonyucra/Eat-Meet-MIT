var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/users');
var Message = require('../models/messages');
var Conversation = require('../models/conversations');


/*
  Require authentication on ALL access to /networks/*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};


/*
  Require ownership whenever accessing a particular message
  This means that the client accessing the resource must be logged in
  as the user that originally posted the message. Clients who are not owners 
  of this particular resource will receive a 404.

*/
// var requireOwnership = function(req, res, next) {
//   if (!(req.currentUser === req.message.author)) {
//     utils.sendErrResponse(res, 404, 'Resource not found.');
//   } else {
//     next();
//   }
// };

/*
  For create requests, require that the request body
  contains a 'content' field. Send error code 400 if not.
*/
var requireContent = function(req, res, next) {
  if (!req.body.content) {
    utils.sendErrResponse(res, 400, 'Content required in request.');
  } else {
    next();
  }
};

/*
  Grab a message from the database whenever one is referenced with an ID in the
  request path (any routes defined with :message as a paramter).
*/
router.param('message', function(req, res, next, messageId) {
    //TODO call function that finds message in conversation w/ given Id
    Message.getMessage(req.currentUser, messageId, function(err, message) {
    if (message) {
      req.message = message;
      //console.log(message);
      next();
    } 
    else {
      utils.sendErrResponse(res, 404, 'Resource not found.');
    }
  });
});

// Register the middleware handlers above.

router.all('*', requireAuthentication);
//router.delete('/:message', requireOwnership);
router.post('*', requireContent);

/*
  At this point, all requests are authenticated and checked 
  1. Clients must be logged into some account
  2. If accessing or modifying a specific resource, the client must own that tweet
  3. Requests are well-formed
*/

/*
  GET /messages
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's messages 
    for the current conversation 
    - content: on success, an object containing the request made by the user
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
    // TODO call function that gets user's messages for current conversation
    Conversation.getConversation(req.currentUser, req.receiverUser, function(err, output) {
    if (err) {
      console.log(err);
      utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    } else {
      utils.sendSuccessResponse(res, { messageArray: output });
    }
  });

});


//   GET /:message
//   Request parameters:
//     - message: the unique ID of the message within the logged in user's conversation 
//   Response:
//     - success: true if the server succeeded in getting the user's message
//     - content: on success, the message object with ID equal to the message referenced in the URL
//     - err: on failure, an error message

// router.get('/:message', function(req, res) {
//   utils.sendSuccessResponse(res, req.message);
// });

/*
  POST /messages
  Request body:
    - content: the content of the message 
  Response:
    - success: true if the server succeeded in recording the user's message 
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
    // TODO call function that add's message to database
    // message should be in req.body.new_message_input
    Message.createMessage(req.currentUser, 
      req.receiverUser,     
      function(err) {
      if (err) {
        utils.sendErrResponse(res, 500, 'An unknown error occurred.');
      } else {
        utils.sendSuccessResponse(res);
      }
    });
});

/*
  DELETE /networks/:message
  Request parameters:
    - message ID: the unique ID of the message within the logged in user's conversation 
  Response:
    - success: true if the server succeeded in deleting the user's message for that conversation 
    - err: on failure, an error message
*/
// router.delete('/:message', function(req, res) {
//     // TODO add schema function that deletes message from Conversation schema
// });

module.exports = router;
