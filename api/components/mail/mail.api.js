let nodemailer = require('nodemailer');

module.exports.enviarCorreo = (req,res)=>{

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'CORREO_DEL_EQUIPO',
      pass: 'CONTRASEÑA_DEL_CORREO_DEL_EQUIPO'
    }
  });

  let mailOptions = {
    from: req.body.from,
    to: 'CORREO_DEL_EQUIPO',
    subject: req.body.subject,
    text: req.body.text
  };

  transporter,sendMail(mailOptions, function(error,info){
    if(error){
      console.log(error);
    } else{
      console.log('Email sent:'+info.response);
    }
  });
}