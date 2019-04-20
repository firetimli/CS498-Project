var Job = require('../models/jobs')
var passport = require('passport');
//var isLoggedIn = require('./utils/auth');

// Register User

module.exports = function (router) {
  router.post('/job', function(req, res) {
    // Fill in dateCreated, createdUser based on session
    Job.create(req.body)
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    })

    // Should also add the job id to the user's posted job list
  });

  router.get('/job', function(req, res) {
    //console.log("skip: " + (typeof(req.query.skip) != 'undefined' ? req.query.skip:""));
    var options = {};
    var where = typeof(req.query.where) != 'undefined' ? JSON.parse(req.query.where) : {};
    var select = typeof(req.query.select) != 'undefined' ? JSON.parse(req.query.select) : {};
    options.sort = typeof(req.query.sort) != 'undefined' ? JSON.parse(req.query.sort) : {};
    options.skip = typeof(req.query.skip) != 'undefined' ? JSON.parse(req.query.skip) : "";
    options.limit = typeof(req.query.limit) != 'undefined' ? JSON.parse(req.query.limit) : "";

    Job.find(where, select, options)
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    });
  });

  return router;
}
