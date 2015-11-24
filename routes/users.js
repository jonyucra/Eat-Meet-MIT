var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/users');
var Conversation = require('../models/conversations');
var Request = require('../models/requests');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
  For both login and create user, we want to send an error code if the user
  is logged in, or if the client did not provide a username and password
  This function returns true if an error code was sent; the caller should return
  immediately in this case.
*/
var isLoggedInOrInvalidBody = function(req, res) {
  if (req.currentUser) {
    utils.sendErrResponse(res, 403, 'There is already a user logged in.');
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  }
  return false;
};

/*
  This function will check to see that the provided username-password combination 
  is valid. For empty username or password, or if the combination is not correct, 
  an error will be returned.

  An user already logged in is not allowed to call the login API again; an attempt
  to do so will result in an error code 403.

  POST /users/login
  Request body:
    - username
    - password
  Response:
    - success: true if login succeeded; false otherwise
    - content: on success, an object with a single field 'user', the object of the logged in user
    - err: on error, an error message
*/
router.post('/login', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  User.verifyPassword(req.body.username, req.body.password, function(err, match) {
    if (match) {
      req.session.username = req.body.username;
      utils.sendSuccessResponse(res, { user : req.body.username });
    } else {
      utils.sendErrResponse(res, 403, 'Username or password invalid.');
    }
  });
});

/*
  POST /users/logout
  Request body: empty
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/logout', function(req, res) {

  if (req.currentUser) {
    req.session.destroy();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
  }
});

/*
*GET /users/network
*/
router.get('/network', function(req,res){
  console.log("GETing network info");
  Conversation.getPeopleInNetwork(req.currentUser,function(err,usernames){
    if(err){
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    }
    else{
      utils.sendSuccessResponse(res,{network:usernames})
    }
  });
});

/*
*POST /users/network
*/
router.post('/network',function(req,res) {
  Conversation.acceptFriendRequest(req.currentUser, req.body.otherPerson,function(err){
    Request.clearMatch(req.currentUser,function(err){
      if(err){
        utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
      }
      else{
        utils.sendSuccessResponse(res)
      }
    });
  });
});

/*
  Create a new user in the system.

  All usernames in the system must be distinct. If a request arrives with a username that
  already exists, the response will be an error.

  This route may only be called accessed without an existing user logged in. If an existing user
  is already logged in, it will result in an error code 403.

  Does NOT automatically log in the user.

  POST /users
  Request body:
    - username
    - password
    - email
  Response:
    - success: true if user creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  if (isLoggedInOrInvalidBody(req, res)) {
    return;
  }
  // TODO add User registration function
  User.createNewUser(req.body.username, req.body.password, req.body.email,  
    function(err, answer) {
      if (err) {
        console.log("500 ERR")
        utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
      } else if (answer.istaken == "username") {
        utils.sendErrResponse(res, 400, 'That username is already taken!');
      } else if (answer.istaken == "email") {
        utils.sendErrResponse(res, 400, 'That email is already taken!');
      } else {
        utils.sendSuccessResponse(res, req.body.username);
      }
  });

});

/*
  Determine whether there is a current user logged in

  GET /users/current
  No request parameters
  Response:
    - success.loggedIn: true if there is a user logged in; false otherwise
    - success.user: if success.loggedIn, the currently logged in user
*/
router.get('/current', function(req, res) {
  if (req.currentUser) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

module.exports = router;
