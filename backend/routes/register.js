var User = require('../models/user')

// Register User

module.exports = function (router) {
  var registerRoute = router.route('/register');
  registerRoute.post(function (req, res) {
    var password = req.body.password;
    var password2 = req.body.password2;

    if (password == password2){
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        res.send(user).end()
      });

    } else{
      res.status(500).send("{errors: \"Passwords don't match\"}").end()
    }
  });

  return router;
}
