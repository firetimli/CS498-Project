var User = require('../models/user')
var passport = require('passport');
//var isLoggedIn = require('./utils/auth');

// Register User

module.exports = function (router) {
  router.get('/user/:id', function(req, res) {
    var id = req.params.id;

    User.findById(req.params.id)
    .then((ret) => {
      console.log(ret);
      res.status(200).json({"ret":ret});
    });
  });

  router.put('/user/:id', function(req, res) {
    var id = req.params.id;

    User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, {new: true})
    .then((ret) => {
      console.log(ret);
      res.status(200).json({"ret":ret});
    });

  });

  return router;
}
