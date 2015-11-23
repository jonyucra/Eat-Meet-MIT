var mongoose = require("mongoose");
var User = require('../models/users');

var requestSchema = mongoose.Schema({
	_id: Number,
	dinnerTimes: [Number],
	timestamp: Number,
	diningHalls: [String],
	status: String,
	createdBy: {type: Number, ref: 'User'}
});


//Creates a new request
requestSchema.statics.createNewRequest = function (diningtimes, dininglocations, author, callback) {

  /*How will we handle multiple request by the same user?
  	For the time being just create whatever Request
  */
  Request.count({}, function( err, count){

    User.findOne({username:author}, function (err,docone){
      console.log("This is my author!");
      console.log()
      console.log("Looking for docone!");
      console.log(docone);
      Request.create({
        _id: count,
        dinnerTimes: diningtimes,
        timestamp: Date.now(),
        diningHalls: dininglocations,
        status: "pending",
        createdBy: docone._id
      }, function (err) {

        Request.findOne({_id: count}, function (err, doctwo){

          User.update({username:author}, {$push:{requestHistory:doctwo._id}}, function(err){
            callback(null);
          })

        });

      });

    });
    //console.log("Did I add stuff?");
  });

}

//matches a user to the earliest timestamped request that fits the bill
requestSchema.statics.getMatch = function (currentuser, callback) {

  console.log("At the beginning! Printing out currentuser:");
  console.log(currentuser);
  User.findOne({username: currentuser}, function (err, doc){
    console.log("This is the doc I found!");
    console.log(doc);
    if( err ){
      console.log("Am I in err?");
      callback(true);
    } else if (doc) { //there is a user found

      if (doc.requestHistory.length>0) {

        console.log("No I'm not in err!");
        latestRequest = doc.requestHistory[doc.requestHistory.length-1];
        console.log("This is my latest request id!");
        console.log(latestRequest);
        Request.findOne({_id: latestRequest}, function (err, doclatest){
          if(err){
            callback(true);
          } else {
            console.log("This is my actual latest request!");
            console.log(doclatest);
            latestDining = doclatest.diningHalls;
            latestTimes = doclatest.dinnerTimes;
            Request.find({ $and: [ {dinnerTimes: { $in: latestTimes }}, { diningHalls: { $in: latestDining }} ] },  function (err,docs){

              if (err) {
                callback(true);
              } else if (docs.length == 0){
                callback(null, null, "pending");
              } else{
                console.log("INSIDE REQUEST!");
                var earliestRequest = docs[0];
                var earliestStamp = docs[0].timestamp;
                docs.forEach(function(e){
                  if (earliestStamp > e.timestamp){
                    earliestRequest = e;
                    earliestStamp = e.timestamp;
                  }
                });
                callback(null, doclatest , earliestRequest);
              }
            });

          }

        });

      } else {
        console.log("Acknowledging that user has no request!");
        callback(null, null, null);
      }

    } else {
      callback("No user found");
    }

  });

}


// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
var Request = mongoose.model('Request', requestSchema);
module.exports = Request;