var mongoose = require("mongoose");

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

  Request.create({
    dinnerTimes: diningtimes,
    timestamp: Date.now(),
    diningHalls: dininglocations,
    status: "Active",
    createdBy: author
    });
    console.log("Did I add stuff?");
    callback(null);

}

//matches a user
requestSchema.statics.getMatches = function (diningtimes, dininglocations, callback) {

  Request.findOne({ dinnerTimes: { $in: diningtimes }, diningHalls: { $in: dininglocations } }, function (err,doc){
    callback(doc);
  });

}


// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
var Request = mongoose.model('Request', requestSchema);
module.exports = Request;