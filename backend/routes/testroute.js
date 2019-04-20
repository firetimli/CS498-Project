module.exports = function (router) {
  var testroute = router.route('/testroute');
  console.log("execute testroute.js default function");
  testroute.get(function (req, res) {
    console.log("execute testroute.js default function2");
    return res.json({"page":"testroute"});
  });

  return router;
}
