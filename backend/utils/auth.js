
function isLoggedIn(req, res, next) {
  // Let this function pass for now
  return next();
  /*
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
  */
};

module.exports = isLoggedIn;
