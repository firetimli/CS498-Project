var Job = require('../models/jobs')
var User = require('../models/user')
var fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios')

module.exports = function (router) {


    router.post('/search', (req, res) => {
      // expect a job id(req.body.id)

      // This function should search the entire database of user for relevant users
      User.find({}).then((ret) => {
        var resumes = [];
        for(var i = 0; i < ret.length; i++) {
          if(ret[i].resume_text) {
            resumes.push(ret[i].resume_text);
          }
          else {
            resumes.push('');
          }
        }

        var jobDescription = req.body.jobDescription;
        console.log("jobDescription from frontend: " + jobDescription);
        axios.post('http://localhost:8000/search', {jobDescription:jobDescription, resumes:resumes}).then(function (response) {
          console.log("response from python search service:");
          console.log(response.data.data);
          var indices = response.data.data;
          relevantUsers = indices.map(i => ret[i])

          res.status(200).json({"ret":relevantUsers});
        }).catch (function (err) {
            console.log(err);
        });

      }).catch((err) => {
        console.log(err);
      });

      // Return the list of relevant user objects
    })

  router.post('/resume', (req, res) => {
    console.log('Got a resume request');

    var resumepdf = req.files.userfile;
    var fileName = req.body.fileName;
    console.log(fileName);
    console.log(resumepdf);

    dirname = __dirname + '/../uploads/' + req.user.username;
    console.log('dir name to upload:' + dirname);
    fs.mkdir(dirname, { recursive: true }, (err) => {
      if (err) throw err;
    });

    filepath = __dirname + '/../uploads/' + req.user.username + '/resume.pdf';
    console.log('file path to upload:' + filepath);
    fs.writeFile(filepath, resumepdf.data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
      console.log('convert pdf to text');

      let dataBuffer = fs.readFileSync(filepath);
      pdf(dataBuffer).then(function(data) {

          // PDF text
          console.log(data.text);

          User.findOneAndUpdate({ _id: req.user._id }, {$set: {resume_text:data.text}}, {new: true})
          .then((ret) => {
            console.log(ret);
          });

      }).catch((err) => {
        console.log('unable to parse pdf data');
        console.log(err);
      });
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
