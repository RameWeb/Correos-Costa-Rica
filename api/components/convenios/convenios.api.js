const conveniosModel = require('./convenios.model');
/**
 * Se exporta la funcion de registrar para que sea entendible para el usuario.route.js
 * @param {peticion} req 
 * @param {respuesta} res 
 */
module.exports.registrar = function(req, res) {
  /**
   * Creamos un nuevo dato con el formato del UserModel
   */
  let newconvenios = new conveniosModel({
    idConvenios: req.body.idConvenios,
    tipo: req.body.tipo,
    nombreInstitucion: req.body.nombreInstitucion,
    tiempo: req.body.tiempo,
    costo: req.body.costo 
  });
  newconvenios.save(function(error) {
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
  conveniosModel.find().then(function(convenios) {
    res.send(convenios);
  });
};

module.exports.actualizar = function(req, res) {
  conveniosModel.findByIdAndUpdate(req.body.idConvenios, { $set: req.body }, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};






    

