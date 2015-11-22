var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

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


//TODO implement a function that makes sure current user is part of conversation

// Register the middleware handlers above.

router.all('*', requireAuthentication);

/*
  At this point, all network views are authenticated 
*/

/*
  GET /networks
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's current request 
    - content: on success, an object containing the request made by the user
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
    // TODO call function that gets user's current request 
});

/*
  Grab a conversation from the database whenever one is referenced with an ID in the
  request path (any routes defined with :conversation as a paramter).
*/
router.param('conversation', function(req, res, next, conversationId) {
    // TODO call function that finds user's conversation with given Id
});

/*
  GET /networks/:conversation
  Request parameters:
    - conversation: the unique ID of the user's conversation in their network 
  Response:
    - success: true if the server succeeded in getting the user's conversation
    - content: on success, the conversation object with ID equal to the conversation referenced in the URL
    - err: on failure, an error message
*/
router.get('/:conversation', function(req, res) {
  utils.sendSuccessResponse(res, req.conversation);
});

module.exports = router;
