var Job = require('../models/jobs')
var User = require('../models/user')
var fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios')
const prod = require('../utils/prod')
var mongoose = require('mongoose');

module.exports = function (router) {


    router.post('/search', (req, res) => {
      // expect a job id(req.body.id)

      // This function should search the entire database of user for relevant users
      User.find({}).then((ret) => {
        var resumes = [];
        for(var i = 0; i < ret.length; i++) {
          var resume_obj = {}
          resume_obj.starredResumes = 0;
          resume_obj.openedTimes = 0;
          resume_obj.text = '';

          if(ret[i].resume_text) {
            resume_obj.text = ret[i].resume_text;
          }

          if(ret[i].openedTimes) {
            resume_obj.openedTimes = ret[i].openedTimes;
          }

          if(ret[i].starredResumes) {
            resume_obj.starredResumes = ret[i].starredResumes;
          }

          resumes.push(resume_obj);
        }

        User.count({}).then((result) => {
          user_cnt = result;
          var jobDescription = req.body.jobDescription;
          console.log("jobDescription from frontend: " + jobDescription);
          axios.post(`${prod.PY_SERVICE_BASE_URL}search`, {jobDescription:jobDescription, resumes:resumes, total_resumes:user_cnt}).then(function (response) {
            console.log("response from python search service:");
            console.log(response.data.data);
            var indices = response.data.data;
            relevantUsers = indices.map(i => ret[i])

            res.status(200).json({"ret":relevantUsers});
          }).catch (function (err) {
              console.log(err);
          });
        }).catch((err) => {
          console.log(err)
        });
      }).catch((err) => {
        console.log(err);
      });

      // Return the list of relevant user objects
    })

  router.post('/open_resume', (req, res) => {
    var update = {};
    update['$inc'] = {};
    update['$inc']['openedTimes'] = 1;

    User.findByIdAndUpdate(req.body.id, update)
    .then((result) => {
      console.log('opened times +1');
      console.log(result);
      res.status(200).json({"message":'ok'});
    }).catch((err) => {
      console.log(err);
    })
  });

  router.post('/star_resume', (req, res) => {

  });

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
