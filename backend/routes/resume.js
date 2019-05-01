var Job = require('../models/jobs')
var fs = require('fs');


module.exports = function (router) {

  router.post('/resume', (req, res) => {
    console.log('Got a resume request');
    var resumepdf = req.files.userfile;
    var fileName = req.body.fileName;
    console.log(fileName);
    console.log(resumepdf);

    fs.mkdir(__dirname + '/../uploads/' + req.user.username, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.writeFile(__dirname + '/../uploads/' + req.user.username + '/resume.pdf', resumepdf.data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });
  })

  return router;
}

/*
Reacher higher admin, higher than your level to pitch your ideas
*/
