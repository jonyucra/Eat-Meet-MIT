var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/users');
var Request = require('../models/requests');
var Handlebars = require('handlebars');
var fs = require('fs');
var cron = require('node-schedule');

// compile email templates
var reminderEmailTemplate = fs.readFileSync('./emails/reminderEmail.handlebars', 'utf-8');
var reminderEmailCompiled = Handlebars.compile(reminderEmailTemplate);

var notificationEmailTemplate = fs.readFileSync('./emails/notificationEmail.handlebars', 'utf-8');
var notificationEmailCompiled = Handlebars.compile(notificationEmailTemplate);

// initialize APIs
var sendgrid_api_key = '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'
var sendgrid  = require('sendgrid')(sendgrid_api_key);

/*
 * Compute string rep. of input time 
 *
 * @time time as integer in range [0,23]
 *
 * @return string rep of time (e.g., 12 -> "Noon")
 */
var getDisplayTime = function(time) {
    if (time == 0) { return 'Midnight'; } 
    else if (time == 12) { return 'Noon'; }
    else if (time > 12) {
        return (time % 12).toString() + 'pm';
    } else {
        return time.toString() + 'am';
    }
}

/* Sends reminder email to user 
 * 
 * @user username of user being reminded 
 * @email email address of user being reminded 
 * @otherUser username of other user current user is having dinner with
 * @place location (dining hall) of dinner
 * @time time of dinner (string)
 *
 */
var sendReminderEmail = function(user, email, otherUser, place, time) {
    sendgrid.send({
          to:       email,
          from:     'eatMeetMIT@mit.edu',
          subject:  'Eat, Meet, MIT Dinner Reminder',
          html:     reminderEmailCompiled({username: user, otherUser: otherUser, 
          place: place, time: time}) 
    }, function(err, json) {
          if (err) { return console.error(err); }
    });
}

/* Send notification email to user of a match 
 * 
 * @user username of user 
 * @email email address of user 
 * @otherUser username of other user current user is having dinner with
 * @place location (dining hall) of dinner
 * @time time of dinner (string)
 *
 */
var sendNotificationEmail = function(user, email, otherUser, place, time) {
    sendgrid.send({
          to:       email,
          from:     'eatMeetMIT@mit.edu',
          subject:  'Eat, Meet, MIT Dinner Notification: You\'ve Been Matched',
          html:     notificationEmailCompiled({username: user, otherUser: otherUser, 
          place: place, time: time}) 
    }, function(err, json) {
          if (err) { return console.error(err); }
    });
}

//// Make recurrence rule so that request database cancels all pending requests at Midnight
//var everyMidnight = new cron.RecurrenceRule();
//everyMidnight.hour = 0;
//cron.scheduleJob(everyMidnight, function() {
//    Request.cancelAllRequests( function(err, success) {
//        if (err) {  
//            utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
//        }
//    });
//});

/*
 * Schedule a reminder email to users an hour before the appointed dinner time
 *
 * @user1 username of a user being reminded
 * @user2 username of other user being reminded
 * @email1 email address of user being reminded
 * @email2 email address of other user being reminded
 * @place location (dining hall) of dinner
 * @time time of dinner (integer form [0-23])
 *
 */

var scheduleReminder = function(user1, email1, user2, email2, place, time) {
    var dt = new Date();
    if (dt.getHours() >= (time - 1) ) { return; }

    var reminderDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
             (time - 1), 0, 0);
    var displayTime = getDisplayTime(time);

    cron.scheduleJob('Reminder', reminderDate, function() {
        reminderJob(user1, email1, user2, email2, place, displayTime);
    });
}

var reminderJob = function(username, email1, username2, email2, place, displayTime ) {

    Request.checkIfMatchExists(username, function (err, exists) {
        if (err) {
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            sendReminderEmail(username, email1, username2, place, displayTime);
            sendReminderEmail(username2, email2, username, place, displayTime);
        }
    })
}

/*
 * Send a notification email to both users in a match
 *
 * @user1 username of a user that got matched 
 * @user2 username of another user that got matched 
 * @email1 email address of a user that got matched 
 * @email2 email address of another user that got matched 
 * @place location (dining hall) of dinner
 * @time time of dinner (integer form [0-23])
 *
 */
var sendNotificationEmails = function(user1, email1, user2, email2, place, time) {
    var displayTime = getDisplayTime(time);
    sendNotificationEmail(user1, email1, user2, place, displayTime);
    sendNotificationEmail(user2, email2, user1, place, displayTime);
}

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
  Request.getMatch(req.currentUser,   
  function(err, originalRequest, matchedRequest, firstTimeMatched) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      if (firstTimeMatched) {
          sendNotificationEmails(req.currentUser, matchedRequest.user_email, matchedRequest.dinner_meet,
              matchedRequest.other_email, matchedRequest.diner_location, matchedRequest.diner_time); 
          scheduleReminder(req.currentUser, matchedRequest.user_email, matchedRequest.dinner_meet, 
            matchedRequest.other_email, matchedRequest.diner_location, matchedRequest.diner_time);
      }
      utils.sendSuccessResponse(res, { request : originalRequest, match: matchedRequest });
    }
  });
});

router.get('/suggestion', function(req, res) {
  Request.giveSuggestion(function(err, diningHall, dinnerTime, message){
    if(err){
      utils.sendErrResponse(res, 500, 'An unknow error has occurred');
    } else if(diningHall==null) {
      utils.sendSuccessResponse(res, {diningHall: null, dinnerTime: null})
    }
    else{
      utils.sendSuccessResponse(res, {diningHall: diningHall, dinnerTime: dinnerTime-12})
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
  //Creates a new request
  Request.createNewRequest(req.body["times[]"], req.body["places[]"], req.body.currentUser,  
  function(err) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });
  //Checks if a request has matched
});

/*
  POST /requests/cancelpending
  Request body:
    - currentUser: current user
  Response:
    - success: true if the server succeeded in cancelling a pending match
    - err: on failure, an error message
*/
router.post('/cancelpending', function(req, res) {

  Request.cancelRequest(req.body.currentUser,
  function(err) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });

});

/*
  POST /requests/cancelmatched
  Request body:
    - currentUser: current user 
  Response:
    - success: true if the server succeeded in cancelling user's request 
    - err: on failure, an error message
*/
router.post('/cancelmatched', function(req, res) {

  Request.clearMatch(req.body.currentUser,
  function(err) {
    if (err) {
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });

});

module.exports = router;
