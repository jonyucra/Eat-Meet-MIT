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


//Creates a new request
requestSchema.statics.createNewRequest = function (diningtimes, dininglocations, author, callback) {

  /*How will we handle multiple request by the same user?
  	For the time being just create whatever Request
  */
  Request.count({}, function( err, count){

    User.findOne({username:author}, function (err,docone){
      Request.create({
        _id: count,
        dinnerTimes: diningtimes,
        timestamp: Date.now(),
        diningHalls: dininglocations,
        status: "pending",
        matchedTo: ["No Match"],
        createdBy: docone._id
      }, function (err) {

        Request.findOne({_id: count}, function (err, doctwo){

          User.update({username:author}, {$push:{requestHistory:doctwo._id}}, function(err){
            callback(null);
          })

        });

      });

    });
  });

}



//Updates the request documents specified and changes their status to matched
var updateAfterMatch = function (firstrequestid, secondrequestid, placematch, timematch, firstperson, secondperson, authoremail, otheremail, callback) {

  Request.update({_id: firstrequestid}, { status: "matched", matchedTo: [timematch, placematch, secondperson, authoremail, otheremail] }, function (err, firstreq) {
    Request.update({_id: secondrequestid}, {status: "matched", matchedTo: [timematch, placematch, firstperson, otheremail, authoremail] }, function (err, secreq) { //Can I do these two in one line?
      callback(null);
    });
  });
}

//returns matching dining hall and time
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

//clears both users requests after a successful dinner (sets them to inactive)
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

//matches a user to the earliest timestamped request that fits the bill
requestSchema.statics.getMatch = function (currentuser, callback) {

  User.findOne({username: currentuser}, function (err, doc){
    if( err ){
      callback(true);
    } else if (doc) { //there is a user found

      if (doc.requestHistory.length>0) { //If there is at least one request in the history (i.e. it's not the user's first time signing in)

        latestRequest = doc.requestHistory[doc.requestHistory.length-1];

        Request.findOne({_id: latestRequest}, function (err, doclatest){ //Gets the latest request
          if(err){
            callback(true);
          } else {

            if ( doclatest.status == "inactive" ){
              callback(null,null,null); // this is just so that request is not recognized and it routes to "you have no inactive requests"
            } else if (doclatest.status == "matched") { 
              callback(null, {status: "matched"} , {diner_time: doclatest.matchedTo[0], diner_location: doclatest.matchedTo[1], dinner_meet: doclatest.matchedTo[2], user_email: doclatest.matchedTo[3], other_email: doclatest.matchedTo[4]});
            } else {

              latestDining = doclatest.diningHalls;
              latestTimes = doclatest.dinnerTimes;
              Request.find({ $and: [ {dinnerTimes: { $in: latestTimes }}, { diningHalls: { $in: latestDining }}, {status: "pending"}, {createdBy:{'$ne':doclatest.createdBy}}] },  function (err,docs){

                if (err) {
                  callback(true);
                } else if (docs.length == 0){
                  callback(null, {status: "pending"}, null);
                } else{
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
                          callback(null, {status: "matched"} , {diner_time: timematch, diner_location: placematch, dinner_meet: docmatched.username, user_email: docauthor.email, other_email: docmatched.email});
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
        callback(null, null, null);
      }

    } else {
      callback("No user found");
    }

  });

}

requestSchema.statics.cancelRequest = function (currentuser, callback){
  User.findOne({username:currentuser}, function (err, docone){
    Request.findOne({_id:docone.requestHistory[docone.requestHistory.length-1]}, function (err, authorrequest){
      Request.update({_id: authorrequest._id}, {status: "inactive", matchedTo: "No Match"}, function (err){
        callback(null,null,null);
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
