var User = require('../models/user')
var passport = require('passport');

// Register User

module.exports = function (router) {

  router.post('/login', passport.authenticate('local'), function(req, res) {
      console.log("someone tries to login....");
      console.log(req.user);
      req.login(req.user, function(err) {
<<<<<<< HEAD
        console.log("-----get here 1------");
        if (err) { console.log(err); return next(err); }
        console.log("-----get here 2------");
        return res.status(200).send(req.user);
=======
        if (err) { return next(err); }
        return res.status(200).json({'userObj':req.user});
>>>>>>> 0e0a106c7fb7f09874b9514df9a457222bb1c2a4
      });
    }
  );

  return router;
}
