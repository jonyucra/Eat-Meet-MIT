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


/*
  Require verification access to ALL /network/:conversation 
  User who aren't part of a conversation shouldn't have access to
  it, and will recieve a 403 error code
  ("Must be part of the conversation to see it!")
*/

var requireVerification = function(req, res, next) {
//TODO implement a function that makes sure current user is part of conversation
}

// Register the middleware handlers above.

router.all('*', requireAuthentication);
// router.get(':conversation, requireVerification);

/*
  At this point, all network views are authenticated 
  And all conversation accesses are verified
*/

/*
  GET /networks
  No request parameters
  Response:
    - success: true if the server succeeded in getting the user's current network 
    - content: on success, an object containing the user's network as well their friend requests 
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
    // TODO call function that gets user's network, and friend requests 
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

/*
  POST /networks/addUser 
  Request parameters:
    - otherUser: username of user to be added to network
  Reponse:
    - success: true if the server succeeded in adding otherUser to user's network
    - err: on failure, an error message
 */

router.post('/addUser', function (req, res) {
    // TODO add function that adds [req.body.content = otherUser] to user's network
});


module.exports = router;
