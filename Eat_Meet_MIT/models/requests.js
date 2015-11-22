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
      Request.create({
        _id: count,
        dinnerTimes: diningtimes,
        timestamp: Date.now(),
        diningHalls: dininglocations,
        status: "Active",
        createdBy: docone._id
      });

      Request.findOne({_id: count}, function (err, doctwo){

        User.update({username:author}, {$push:{requestHistory:doctwo._id}}, function(err){
          callback(null);
        })

      });

    });
    //console.log("Did I add stuff?");
  });

}

//matches a user to the earliest timestamped request that fits the bill
requestSchema.statics.getMatch = function (diningtimes, dininglocations, callback) {

  Request.find({ $and: [ {dinnerTimes: { $in: diningtimes }}, { diningHalls: { $in: dininglocations }} ] },  function (err,docs){

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
      })
      callback(null, earliestStamp, "matched");
      }
  });

}


// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
var Request = mongoose.model('Request', requestSchema);
module.exports = Request;