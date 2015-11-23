var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Request = require('../models/requests');

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
  console.log("Do I enter the get request route?");
  Request.getMatch(req.currentUser,   
  function(err, originalRequest, matchedRequest) {
    if (err) {
      console.log("500 ERR")
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      console.log("I'm in the routes for matching!");
      console.log("This is my original request!");
      console.log(originalRequest);
      console.log("This is my matched request!");
      console.log(matchedRequest);
      //console.log("This is my request.status");
      //console.log(originalRequest[status]);
      utils.sendSuccessResponse(res, { request : originalRequest, match: matchedRequest });
    }
  });
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
  //console.log("printing out req body!");
  //console.log(req);
  console.log(req.body.currentUser);
  console.log(req.body["times[]"]);
  console.log(req.body["places[]"]);
  //Creates a new request
  Request.createNewRequest(req.body["times[]"], req.body["places[]"], req.body.currentUser,  
  function(err) {
    if (err) {
      console.log("500 ERR")
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });
  //Checks if a request has matched




});

module.exports = router;
