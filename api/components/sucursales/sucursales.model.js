const bcryptjs = require('bcryptjs');

//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let sucursalesSchema = new mongoose.Schema({
  idSucursal        : {type: String, required: true},
  nombreSucursal               : {type: String, required: true},
  latitude  : {type: String, required: true},
  longitude             : {type: String},
  direccion              : {type: String, required: true},
  telefono              : {type: String, required: true},
});
//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('sucursales', sucursalesSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural