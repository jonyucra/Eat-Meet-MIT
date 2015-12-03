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

var notificationEmailTemplate = fs.readFileSync('./emails/notificationEmail.handlebars', 'utf-8');
var notificationEmailCompiled = Handlebars.compile(notificationEmailTemplate);

// initialize APIs
var sendgrid_api_key = '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'
var sendgrid  = require('sendgrid')(sendgrid_api_key);

/*
 * Compute the modulus of an integer (even negative ones)
 *
 * @n integer to compute modulus
 * @m modulus
 *
 * @return n modulus m
 */
var mod = function(n, m) {
    return ( (n % m) + m) % m;
}

/*
 * Compute string rep. of input time 
 *
 * @time time as integer in range [0,23]
 *
 * @return string rep of time (e.g., 12 -> "Noon")
 *
 */
var getDisplayTime = function(time) {
    if (time == 0) {
        return 'Midnight';
    } else if (time == 12) {
        return 'Noon';
    }
    else if (time > 12) {
        return (time % 12).toString() + 'pm';
    } else {
        return time.toString() + 'am';
    }
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

var scheduleReminder = function(user1, email1, user2, email2, place, time) {
    var dt = new Date();
    if ( mod(time - dt.getHours(), 24)  <= 1) {
        return;
    }
    var reminderDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            mod( (time - 1), 24), 0, 0);

    var displayTime = getDisplayTime(time);

    cron.scheduleJob('Reminder', reminderDate, function() {
        console.log('Sending Reminder Emails');
        sendReminderEmail(user1, email1, user2, place, displayTime);
        sendReminderEmail(user2, email2, user1, place, displayTime);
    });
}

//scheduleReminder('Carlos', 'John', 'ccaldera@mit.edu', 'jdonavon@mit.edu', 'Next', '2');

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

//sendNotificationEmail('Carlos', 'ccaldera@mit.edu', 'John', 'Da Clubbb', '7pm');

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
      // FIXME: add a boolean in matchedRequest, so that this only happens one time!!! 
      if (matchedRequest) {
          sendNotificationEmails(req.currentUser, matchedRequest.user_email, matchedRequest.dinner_meet,
          matchedRequest.other_email, matchedRequest.diner_location, matchedRequest.diner_time); 
        scheduleReminder(req.currentUser, matchedRequest.user_email, matchedRequest.dinner_meet, 
            matchedRequest.other_email, matchedRequest.diner_location, matchedRequest.diner_time);
      }
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
  //Checks if a request has matched
});

router.post('/cancelpending', function(req, res) {

  Request.cancelRequest(req.body.currentUser,
  function(err) {
    if (err) {
      console.log("500 ERR");
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });

});

router.post('/cancelmatched', function(req, res) {

  Request.clearMatch(req.body.currentUser,
  function(err) {
    if (err) {
      console.log("500 ERR");
      utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
    } else {
      utils.sendSuccessResponse(res);
    }
  });

});

module.exports = router;
