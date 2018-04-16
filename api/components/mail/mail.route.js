let express = require('express'),
    router = express.Router(),
    mailApi = require('./mail.api.js');

router.route('/mail')
  post((req,res)=>{
    mailApi.enviarCorreo(req,res);
  });

module.exports = reouter;