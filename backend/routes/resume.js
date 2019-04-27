var Job = require('../models/jobs')



module.exports = function (router) {

  router.post('/resume', (req, res) => {
    console.log('Got a resume request');
    var resumepdf = req.files.userfile;
    var fileName = req.body.fileName;
    // Use the mv() method to place the file somewhere on your server
    resumepdf.mv(__dirname + '/upload/' + fileName , function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("uploaded");
      }
    });
  })

  return router;
}
