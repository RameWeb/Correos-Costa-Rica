const sucursalesModel = require('./sucursales.model');
/**
 * Se exporta la funcion de registrar para que sea entendible para el usuario.route.js
 * @param {peticion} req 
 * @param {respuesta} res 
 */
module.exports.registrar = function(req, res) {
  /**
   * Creamos un nuevo dato con el formato del UserModel
   */
  let newsucursales = new sucursalesModel({
    idSucursal: req.body.idSucursal,
    nombreSucursal: req.body.nombreSucursal,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    direccion: req.body.direccion, 
    telefono: req.body.telefono
  });
  newsucursales.save(function(error) {
    if (error) {
      res.json({ success: false, msg: 'Ha ocurrido un error en el registro de la sucursal' + error });
    } else {
      res.json({ success: true, msg: 'Se registró la sucursal correctamente' });
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
  sucursalesModel.find().then(function(sucursales) {
    res.send(sucursales);
  });
};

module.exports.actualizar = function(req, res) {
  sucursalesModel.findByIdAndUpdate(req.body.idSucursal, { $set: req.body }, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};