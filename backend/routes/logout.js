var User = require('../models/user')

module.exports = function (router) {
  router.get('/logout', function(req, res) {
      req.logout();
      res.send(null);
    }
  );
  return router;
}
