var User = require('../models/user')
var passport = require('passport');
//var isLoggedIn = require('./utils/auth');

// Register User

module.exports = function (router) {
  router.get('/user', function(req, res) {
    var id = req.user._id

    User.findById(id)
    .then((ret) => {
      console.log(ret);
      res.status(200).json({"ret":ret});
    });
  });

  router.put('/user', function(req, res) {
    var id = req.user._id
    console.log('put user');
    console.log(req.body);
    User.findOneAndUpdate({ _id: id }, {$set: req.body}, {new: true})
    .then((ret) => {
      console.log(ret);
      res.status(200).json({"ret":ret});
    });

  });

  return router;
}
