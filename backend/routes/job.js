var Job = require('../models/jobs');
var User = require('../models/user')
var passport = require('passport');
var mongoose = require('mongoose');

//var isLoggedIn = require('./utils/auth');

// Register User

module.exports = function (router) {
  router.post('/job', function(req, res) {
    // Fill in dateCreated, createdUser based on session
    console.log('user: ');
    console.log(req.user);
    req.body.createdUser = req.user.username;
    req.body.numStars = 0;

    Job.create(req.body)
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    })

    // Should also add the job id to the user's posted job list
  });

  router.get('/job', function(req, res) {
    console.log("getting jobs..");
    var options = {};
    var where = typeof(req.query.where) != 'undefined' ? JSON.parse(req.query.where) : {};
    var select = typeof(req.query.select) != 'undefined' ? JSON.parse(req.query.select) : {};
    options.sort = typeof(req.query.sort) != 'undefined' ? JSON.parse(req.query.sort) : {};
    options.skip = typeof(req.query.skip) != 'undefined' ? JSON.parse(req.query.skip) : "";
    options.limit = typeof(req.query.limit) != 'undefined' ? JSON.parse(req.query.limit) : "";

    var current_username = req.user.username;
    console.log('get jobs posted by ' + current_username);
    Job.find({createdUser:current_username})
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    });
  });

  router.get('/job/:id', function(req, res) {
    var id = req.params.id;

    Job.findById(req.params.id)
    .then((ret) => {
      console.log(ret);
      res.status(200).json({"ret":ret});
    });
  });

  router.get('/test', function(req, res){
    console.log("connected");
    return res.status(200).json({'ss':'ss'})
  });

  router.delete('/job/:id', function (req, res) {
    var id = req.params.id;

    Job.findOneAndRemove({ _id: req.params.id })
    .then((err, removed_job) => {
      res.status(200).json({"ret": removed_job});
    });
  });

  router.post('/getRecentStarredNumber', function(req, res) {
    var id = req.body.id;
    console.log("---------get star number-------");
    console.log(req.body.id);

    User.find({ starredJobSeekers: { $in : [req.body.id]} }  )
    .then((ret) => {
      res.status(200).json({"starredUsers": ret});
    });
  });

  router.post('/getStarredUsers', function(req, res) {
    var id = req.body.currentJobId;
    console.log("---------get starred id list-------");

    Job.findOne({_id:id})
    .then((job) => {
      starredResumes = job.starredResumes;
      var users = [];
      for(var i = 0; i < starredResumes.length; i++){
        users.push(starredResumes[i]);
      }
      console.log('all userids');
      console.log(users);
      User.find({ _id: { $in : users} }  )
      .then((ret) => {
        res.status(200).json({"starredUsers": ret});
      }).catch((err) => {console.log('err converting ids to users')});
    }).catch((err) => {console.log('err finding job')});

  });

  router.post('/deleteStarredResume', function(req, res) {

    var jobid = mongoose.Types.ObjectId(req.body.jobid);
    var userid = req.body.userid;

    console.log('------------delete resume endpoint------------');
    console.log(jobid);
    console.log(userid);

    Job.findOne({_id: jobid})
    .then((job) => {
      var oldStarredResumes = job.starredResumes;
      var index = oldStarredResumes.indexOf(userid);
      if (index > -1) {
        oldStarredResumes.splice(index, 1);
      }
      Job.update({_id: jobid }, { "$set": { "starredResumes": oldStarredResumes }})
      .then((ret) => {
        console.log('just deleted a starred resume from a job');
        console.log(ret);
        res.status(200).json({"message": "ok"});
      }).catch((err) => {
        res.status(200).json({"message": "err"});
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  return router;
}
