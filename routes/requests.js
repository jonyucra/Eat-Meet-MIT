var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Request = require('../models/requests');
var Handlebars = require('handlebars');
var fs = require('fs');
var cron = require('node-schedule');

// compile email templates
var reminderEmailTemplate = fs.readFileSync('./emails/reminderEmail.handlebars', 'utf-8');
var reminderEmailCompiled = Handlebars.compile(reminderEmailTemplate);

// initialize APIs
var sendgrid_api_key = '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'
var sendgrid  = require('sendgrid')(sendgrid_api_key);

var mod = function(n, m) {
    return ( (n % m) + m) % m;
}

//var twilio_acct_sid = 'ACd1f88a6ab75330f4978ef98966ad13e1';
//var twilio_auth_token = '1e5659210473d88000d6aa171948b73a';
//var client = require('twilio')(twilio_acct_sid, twilio_auth_token);
//
//// Send a reminder text message to user
//var sendReminderText = function(userPhoneNumber) {
//    client.sendMessage({
//    
//        to: userPhoneNumber,
//        from: '+18173306125',
//        body: 'Hello! This is a friendly reminder that you have a dinner coming up soon!'
//    
//    }, function(err, response) {
//        if (err) {
//            console.log(err);
//        }
//    });
//}

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

var scheduleReminder = function(user1, user2, email1, email2, place, time) {
    var dt = new Date();
    if ( mod(time - dt.getHours(), 24)  <= 1) {
        return;
    }
    var reminderDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            mod( (time - 1), 24), 0, 0);

    var displayTime;
    if (time == 0) {
        displayTime = 'Midnight';
    } else if (time == 12) {
        displayTime = 'Noon';
    }
    else if (time > 12) {
        displayTime = (time % 12).toString() + 'pm';
    } else {
        displayTime = time.toString() + 'am';
    }

    cron.scheduleJob('Reminder', reminderDate, function() {
        console.log('Sending Reminder Emails');
        sendReminderEmail(user1, email1, user2, place, displayTime);
        sendReminderEmail(user2, email2, user1, place, displayTime);
    });
}

//scheduleReminder('Carlos', 'John', 'ccaldera@mit.edu', 'jdonavon@mit.edu', 'Next', '2');

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
  function(err, originalRequest, matchedRequest) {
    if (err) {
      console.log("500 ERR")
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      // TODO: need to make sure matchedRequest returns currentUser email
      //        and email of matched user  
      // FIXME: uncomment following lines when functionality added
      //if (matchedRequest) {
      //  scheduleReminder(req.currentUser, matchedRequest.user_email, matchedRequest.dinner_meet, matchedRequest.other_email,
      //      matchedRequest.diner_location, matchedRequest.diner_time);
      //}
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

});

module.exports = router;
