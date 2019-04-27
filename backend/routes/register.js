var User = require('../models/user')

// Register User

module.exports = function (router) {
  var registerRoute = router.route('/register');
  registerRoute.post(function (req, res) {
    var password = req.body.password;
    var password2 = req.body.password2;

    console.log('signup info');
    console.log(req.body);

    if (password == password2){
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType,
        company: '',
        Industry: '',
        location: '',
        type: '',
        size: 0
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
