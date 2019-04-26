var User = require('../models/user')

// Register User

module.exports = function (router) {
  router.get('/is_authenticated', function(req, res) {
      if(req.isAuthenticated()) {
        u = req.user;
      }
      else {
        u = null;
      }
      res.json({"userObj":u, "is_authenticated" : req.isAuthenticated().toString()});
    }
  );
  return router;
}


/*
Redirection
res.writeHead(302, {
    Location: 'http://anotherdomain.com:8888/some/path'
});
res.end();
*/
