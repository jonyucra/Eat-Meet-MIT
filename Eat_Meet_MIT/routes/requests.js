var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

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
  At this point, all request forms are authenticated 
*/

/*
  GET /requests
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
  POST /requests
  Request body:
    - formData: the data specified by the user
  Response:
    - success: true if the server succeeded in recording the user's request 
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
    // TODO call function that stores user's request to the database 
});

module.exports = router;
