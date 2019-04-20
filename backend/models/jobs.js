// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var JobSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    createdUser: {type: String},
    endDate: { type: Date },
    dateCreated: { type: Date },
    relevantJobSeekers: [{type: String}]
});

// Export the Mongoose model
module.exports = mongoose.model('Job', JobSchema);
