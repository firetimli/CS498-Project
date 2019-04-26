var Job = require('../models/jobs')
const formidable = require('formidable')

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
  })

  return router;
}
