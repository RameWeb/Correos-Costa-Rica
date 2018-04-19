const bcryptjs = require('bcryptjs');

//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let productosSchema = new mongoose.Schema({
  nombreTipoProducto        : {type: String, required: true},
  impuesto                  : {type: String, required: true},
  
});
//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('productos', productosSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural