var Job = require('../models/jobs');
var User = require('../models/user')
var passport = require('passport');
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
    var id = req.body.currentJob;
    console.log("---------get starred id list-------");
    console.log(req.body.currentJob);

    
  });

  return router;
}
