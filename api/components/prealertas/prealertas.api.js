const PreAlertaModel = require('./prealertas.model'),
      bcrypt = require('bcryptjs');

module.exports.registrar = (req, res) => {
  var newPrealerta = new preAlertaModel({
    tracking : req.body.tracking,
    url : req.body.url,
    tipoProducto : req.body.tipoProducto,
    valor : req.body.valor,
    peso : req.body.peso,
    courier : req.body.courier
  });

  newPrealerta.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de la prealerta' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  preAlertaModel.find().then((prealerta) => {
    res.send(prealerta);
  });
};

module.exports.actualizar = (req,res) => {
  preAlertaModel.findByIdAndUpdate(req.body.tracking, { $set: req.body}, (err, user) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};