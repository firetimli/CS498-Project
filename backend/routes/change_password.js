var User = require('../models/user')
var passport = require('passport');

module.exports = function (router) {
  router.post('/change_password', function(req, res) {
      // Fill in dateCreated, createdUser based on session
      var query = {username: req.user.username};
      User.findOne(query)
      .then((u) => {
        console.log(u);
        User.comparePassword(req.body.oldpassword, u.password, (a, isMatch) => {
          if(isMatch == true) {
            User.setPassword(u, req.body.newpassword, function(err, createu) {
              if(err) {
                return res.status(200).json({success: false, message:'unknwon error when changing password'});
              }
              return res.status(200).json({success: true})
            });
          }
          else {
              return res.status(200).json({success: false, message:'old password is wrong'});
          }
        });
      });
  });
  return router;
}
