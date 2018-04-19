const courierModel = require('./couriers.model');

/**
 * Se exporta la funcion de registrar para que sea entendible para el usuario.route.js
 * @param {peticion} req 
 * @param {respuesta} res 
 */
module.exports.registrar = (req, res) => {

  let newCourier = Object.assign(new courierModel(), req.body);

  console.log('Objeto que viene del front-end');
  console.log(newCourier);


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
  courierModel.update({id: req.body.id}, req.body, (err, couriers) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};