var User = require('../models/user')

module.exports = function (router) {
  router.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({'status':'OK'})

    }
  );
  return router;
}
