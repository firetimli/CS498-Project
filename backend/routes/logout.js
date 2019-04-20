var User = require('../models/user')

module.exports = function (router) {
  router.get('/is_authenticated', function(req, res) {
      req.logout();
      res.send(null);
    }
  );
  return router;
}
