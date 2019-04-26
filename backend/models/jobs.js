// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    endDate: { type: Date },
    dateCreated: { type: Date },
    createdUser: {type: String},
    relevantJobSeekers: [{type: String}],
    numStars: {type: Number},
    starredResumes: [{JS_name: {type:String}, JS_resumeLink: {type:String}}]
});

// Export the Mongoose model
module.exports = mongoose.model('Job', JobSchema);
