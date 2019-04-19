var Job = require('../models/jobs')
var passport = require('passport');
//var isLoggedIn = require('./utils/auth');

// Register User

module.exports = function (router) {
  router.post('/job', function(req, res) {
    Job.create(req.body)
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    })

    // Should also add the job id to the user's posted job list
  });

  router.get('/job', function(req, res) {
    Job.create(req.body)
    .then((ret) => {
      console.log(`job... ${ret}`);
      res.status(200).json({"ret":ret});
    })
  });

  return router;
}
