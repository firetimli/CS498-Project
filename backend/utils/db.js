var mongoose = require('mongoose');
var secrets = require('../config/secrets');

// Connect to a MongoDB
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
console.log("Connected to database");

module.exports = db;
