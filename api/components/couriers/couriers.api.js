const courierModel = require('./couriers.model');

  module.exports.registrar = (req, res) => {
    var newCourier = new courierModel({
      idCourier         :  req.body.idCourier,
      nombreCourier     :  req.body.nombreCourier,
      empresaCourier    :  req.body.empresaCourier,
    });

  newCourier.save((err) => {
    if(err){
      res.json({success:false, msj: 'Ha ocurrido un error en el registro de courier' + err});
    }else{
      res.json({success:true, msj:'Se registró el courier correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  courierModel.find().then((couriers) => {
    res.send(couriers);
  });
};

module.exports.actualizar = (req,res) => {
  courierModel.update({idCourier: req.body.idCourier}, req.body, (err, couriers) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  })
};