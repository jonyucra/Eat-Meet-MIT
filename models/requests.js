var mongoose = require("mongoose");
var User = require('../models/users');

var requestSchema = mongoose.Schema({
	_id: Number,
	dinnerTimes: [Number],
	timestamp: Number,
	diningHalls: [String],
	status: String,
  matchedTo: [String],
	createdBy: {type: Number, ref: 'User'}
});

/**
   * Public function. Creates a new request.
   * @param {Array<Integer>} diningtimes - Array of Integers containing the times a user is willing to eat at.
   * @param {Array<String>} dininglocations - Array of Strings containing the locations a user is willing to eat at.
   * @param {String} author - The username of the user who's placing this specific request.
   * @param {function} callback - Callback function
**/
requestSchema.statics.createNewRequest = function (diningtimes, dininglocations, author, callback) {

  Request.count({}, function (err, count){

    User.findOne({username:author}, function (err,userdoc){
      Request.create({
        _id: count,
        dinnerTimes: diningtimes,
        timestamp: Date.now(),
        diningHalls: dininglocations,
        status: "pending",
        matchedTo: ["No Match"],
        createdBy: userdoc._id
      }, function (err) {

        Request.findOne({_id: count}, function (err, requestdoc){

          User.update({username:author}, {$push:{requestHistory:requestdoc._id}}, function(err){
            callback(null, "New request created.");
          })

        });

      });

    });
  });

}

/**
   * Private function. Updates requests collection after a match is made.
   * @param {Integer} authorrequestid - The id of the request from the user who is currently logged in.
   * @param {Integer} otherrequestid - The id of the request from the user who the current user matched to.
   * @param {String} placematch - The dining hall the two matched users have in common.
   * @param {Integer} timematch - The time the two matched users have in common.
   * @param {String} authorname - The username of the user who is currently logged in.
   * @param {String} othername -  The username of the user who the current user matched to.
   * @param {String} authoremail -  The email of the user who is currently logged in.
   * @param {String} otheremail - The email of the user who the current user matched to.
   * @param {function} callback -  Callback function.
**/
var updateAfterMatch = function (authorrequestid, otherrequestid, placematch, timematch, authorname, othername, authoremail, otheremail, callback) {

  Request.update({_id: authorrequestid}, { status: "matched", matchedTo: [timematch, placematch, othername, authoremail, otheremail] }, function (err, firstreq) {
    Request.update({_id: otherrequestid}, {status: "matched", matchedTo: [timematch, placematch, authorname, otheremail, authoremail] }, function (err, secreq) { 
      callback(null);
    });
  });
}

/**
   * Private function. Gets a dininghall and time that two specified requests have in common.
   * @param {Integer} firstrequestid - The id of the request from the user who is currently logged in.
   * @param {Integer} secondrequestid - The id of the request from the user who the current user matched to.
   * @param {function} callback -  Callback function.
**/
var getTimeAndLocation = function (firstrequestid, secondrequestid, callback) {

  Request.findOne({_id:firstrequestid}, function (err, firstdoc) {
    Request.findOne({_id:secondrequestid}, function (err, secdoc) {

      matchingHalls = [];
      matchingTimes = [];

      firstdoc.diningHalls.forEach(function(e){
        if (secdoc.diningHalls.indexOf(e) > -1 ){
          matchingHalls.push(e);
        }
      });

      firstdoc.dinnerTimes.forEach(function(e){
        if (secdoc.dinnerTimes.indexOf(e) > -1 ){
          matchingTimes.push(e);
        }
      });

      callback(null, matchingHalls[0], matchingTimes[0]);

    });
  });

}

/**
   * Public function. Sets a pair of matched requests to inactive status.
   * @param {String} currentuser - The username of the user who is currently logged in.
   * @param {function} callback -  Callback function.
**/
requestSchema.statics.clearMatch = function (currentuser, callback) {
  User.findOne({username: currentuser}, function (err, authoruser){
    Request.findOne({_id:authoruser.requestHistory[authoruser.requestHistory.length-1]}, function (err, authorrequest){
      User.findOne({username: authorrequest.matchedTo[2]}, function (err, matcheduser){
        Request.update({_id: authoruser.requestHistory[authoruser.requestHistory.length-1]}, {status: "inactive",matchedTo:["No Match"]}, function (err){
          Request.update({_id: matcheduser.requestHistory[matcheduser.requestHistory.length-1]}, {status: "inactive",matchedTo:["No Match"]}, function (err){
            callback(null);
          });
        });
      });
    });
  });
}

/**
   * Public function. Matches a request to the earliest timestamped request that fits the bill, if the user's status allows for it.
   * @param {String} currentuser - The username of the user who is currently logged in.
   * @param {function} callback -  Callback function.
**/
requestSchema.statics.getMatch = function (currentuser, callback) {

  User.findOne({username: currentuser}, function (err, doc){
    if( err ){
      callback(true);
    } else if (doc) { //current user exists

      if (doc.requestHistory.length>0) { //There is at least one request in the history

        latestRequest = doc.requestHistory[doc.requestHistory.length-1];

        Request.findOne({_id: latestRequest}, function (err, doclatest){ //Gets the latest request
          if(err){
            callback(true);
          } else {

            if ( doclatest.status == "inactive" ){ //Request is not recognized. i.e. "You have no requests, make one."
              callback(null,null,null, null, "You have no requests."); 
            } else if (doclatest.status == "matched") { //Latest request is a matched request.
              callback(null, {status: "matched"} , {diner_time: doclatest.matchedTo[0], diner_location: doclatest.matchedTo[1], dinner_meet: doclatest.matchedTo[2], user_email: doclatest.matchedTo[3], other_email: doclatest.matchedTo[4]}, false, "You already have a match.");
            } else { //You're making a new request
              latestDining = doclatest.diningHalls;
              latestTimes = doclatest.dinnerTimes;
              Request.find({ $and: [ {dinnerTimes: { $in: latestTimes }}, { diningHalls: { $in: latestDining }}, {status: "pending"}, {createdBy:{'$ne':doclatest.createdBy}}] },  function (err,docs){

                if (err) {
                  callback(true);
                } else if (docs.length == 0){ // There is no request which matches yours
                  callback(null, {status: "pending"}, null, null, "There is no request to match you with yet.");
                } else{ //There is a matching request
                  var earliestRequest = docs[0];
                  var earliestStamp = docs[0].timestamp;
                  docs.forEach(function(e){
                    if (earliestStamp > e.timestamp){
                      earliestRequest = e;
                      earliestStamp = e.timestamp;
                    }
                  });

                  getTimeAndLocation(doclatest._id, earliestRequest._id, function (err, placematch, timematch) {
                    User.findOne({_id: earliestRequest.createdBy}, function (err, docmatched) {
                      User.findOne({_id: doclatest.createdBy}, function (err, docauthor) {
                        updateAfterMatch(doclatest._id, earliestRequest._id, placematch, timematch, docauthor.username, docmatched.username, docauthor.email, docmatched.email, function (err) {
                          callback(null, {status: "matched"} , {diner_time: timematch, diner_location: placematch, dinner_meet: docmatched.username, user_email: docauthor.email, other_email: docmatched.email}, true, "You have been matched.");
                        });
                      });
                    });
                  });

                }
              });


            }

          }

        });

      } else {
        callback(null, null, null, null, "You have no request history."); //User has no request history
      }

    } else {
      callback("No user found.");
    }

  });

}

/**
   * Public function. Sets a request to inactive, effectively cancelling it.
   * @param {String} currentuser - The username of the user who is currently logged in.
   * @param {function} callback -  Callback function.
**/
requestSchema.statics.cancelRequest = function (currentuser, callback){
  User.findOne({username:currentuser}, function (err, docone){
    Request.findOne({_id:docone.requestHistory[docone.requestHistory.length-1]}, function (err, authorrequest){
      Request.update({_id: authorrequest._id}, {status: "inactive", matchedTo: "No Match"}, function (err){
        callback(null,"Request has been cancelled.");
      });
    });
  });
}

// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
var Request = mongoose.model('Request', requestSchema);
module.exports = Request;
