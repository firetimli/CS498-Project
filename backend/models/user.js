var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  username: { type: String, index:true},
  password: { type: String},
  email: { type: String},
  company: { type: String},
  industry: { type: String},
  location: { type: String},
  type: { type: String},
  size: { type: Number},
  isRecruiter: { type: Boolean},
  starredJobSeekers: [{type: String}],
  postedJobs: [{type: String}],
  resume_url: {type: String},
  userType: {type: String}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.setPassword = function(userObj, candidatePassword, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(candidatePassword, salt, function(err, hash) {
      userObj.password = hash;
      userObj.save(callback);
    });
  });
}
