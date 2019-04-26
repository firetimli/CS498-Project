var User = require('../models/user')
var passport = require('passport');

// Register User

module.exports = function (router) {

  router.post('/login', passport.authenticate('local'), function(req, res) {
      console.log("someone tries to login....");
      console.log(req.user);
      req.login(req.user, function(err) {
        if (err) { return next(err); }
        return res.status(200).json({'userObj':req.user});
      });
    }
  );

  return router;
}