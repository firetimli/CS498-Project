var Job = require('../models/jobs')



module.exports = function (router) {

  router.post('/resume', (req, res) => {
    console.log('Got a resume request');

    new formidable.IncomingForm().parse(req)
      .on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
      })
      .on('file', (name, file) => {
        console.log('Uploaded file', name, file)
      })
      .on('aborted', () => {
        console.error('Request aborted by the user')
      })
      .on('error', (err) => {
        console.error('Error', err)
        throw err
      })
      .on('end', () => {
        res.status(200).json({"ret":'ok'});
      })

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

  router.post('/deleteStarredResume', function(req, res) {
    // Fill in dateCreated, createdUser based on session
    console.log(req.body.link);
    console.log(req.body.id);

    Job.findById(req.body.id)
    .then((foundJob) => {
      console.log(foundJob);
      // console.log(foundJob.starredResumes);
      var copyOfStarredResumes = foundJob.starredResumes.slice();
      console.log(copyOfStarredResumes);

      var i = 0;
      for(var i = 0; i < foundJob.starredResumes.length; i++){
        resumeInfo = foundJob.starredResumes[i];
        console.log(resumeInfo);
        if(resumeInfo["JS_resumeLink"] == req.body.link){
          copyOfStarredResumes.splice(i, 1);
          break;
        }
      }

      console.log("---------deleted resume-------");
      console.log(copyOfStarredResumes);
      Job.findOneAndUpdate(req.body.id, {'$set':{starredResumes: copyOfStarredResumes}})
      .then((ret) => {
        console.log('ok');
      })
      .catch((err)=> {
        console.log('err');
      });

    });

  });


  return router;
}
