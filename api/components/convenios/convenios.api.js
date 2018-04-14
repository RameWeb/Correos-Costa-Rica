const ConvAdModel = require('./convenios.model');
/**
 * Se exporta la funcion de registrar para que sea entendible para el usuario.route.js
 * @param {peticion} req 
 * @param {respuesta} res 
 */
module.exports.registrar = function(req, res) {
  /**
   * Creamos un nuevo dato con el formato del UserModel
   */
  let newConvAd = new ConvAdModel({
    nombreInstitucion: req.body.nombreInstitucion,
    tipo: req.body.tipo,
    tiempo : req.body.tiempo,
    costo : req.body.costo ,
    idConvenios : req.body.idConvenios
  });
  newConvAd.save(function(error) {
    if (error) {
      res.json({ success: false, msg: 'Ha ocurrido un error en el registro del convenio' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el convenio correctamente' });
    }
  })
};
/**
 * Funcion que retorna todos los usuarios que tengan la misma estructura del userModel
 * @param {Peticion} req 
 * @param {Respuesta} res 
 */
module.exports.listarTodos = function(req, res) {
  /**
   * Esta funcion busca todos los datos que tengan la misma estructura del userModel y los retorna
   */
  ConvAdModel.find().then(function(convenios) {
    res.send(convenios);
  });
};

module.exports.actualizar = function(req, res) {
  UserModel.findByIdAndUpdate(req.body.idConvenios, { $set: req.body }, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};






    

