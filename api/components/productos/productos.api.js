const productosModel = require('./productos.model');
/**
 * Se exporta la funcion de registrar para que sea entendible para el usuario.route.js
 * @param {peticion} req 
 * @param {respuesta} res 
 */
module.exports.registrar = function(req, res) {
  /**
   * Creamos un nuevo dato con el formato del UserModel
   */
  let newproductos = new productosModel({
    nombreTipoProducto: req.body.nombreTipoProducto,
    impuesto: req.body.impuesto,
    
  });
  newproductos.save(function(error) {
    if (error) {
      res.json({ success: false, msg: 'Ha ocurrido un error en el registro del producto' + error });
    } else {
      res.json({ success: true, msg: 'Se registró el producto correctamente' });
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
  productosModel.find().then(function(productos) {
    res.send(productos);
  });
};

module.exports.actualizar = function(req, res) {
  productosModel.findByIdAndUpdate(req.body.nombreTipoProducto, { $set: req.body }, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
    }
  });
};

module.exports.eliminar = function(req, res) {
  productosModel.remove(req.body.nombreTipoProducto, { $set: req.body }, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'No se ha eliminado.' + handleError(err) });

    } else {
      res.json({ success: true, msg: 'Se ha eliminado correctamente.' + res });
    }
  });
};




    

