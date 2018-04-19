const PreAlertaModel = require('./prealertas.model'),
      bcrypt = require('bcryptjs');

module.exports.registrar = (req, res) => {
  let newPrealerta = new PreAlertaModel({
    tracking : req.body.tracking,
    url : req.body.url,
    tipoProducto : req.body.tipoProducto,
    valor : req.body.valor,
    peso : req.body.peso,
    courier : req.body.courier
  });

  console.log('Objeto que viene del front-end');
  console.log(newPrealerta);

  newPrealerta.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de la prealerta' + err});
    }else{
      res.json({success:true, msg:'Se registró correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  PreAlertaModel.find().then((prealerta) => {
    res.send(prealerta);
  });
};

module.exports.actualizar = (req,res) => {
  PreAlertaModel.findByIdAndUpdate(req.body.tracking, { $set: req.body}, (err, user) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};