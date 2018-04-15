const bcryptjs = require('bcryptjs');

//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let conveniosSchema = new mongoose.Schema({
  idConvenios        : {type: String, required: true},
  tipo               : {type: String, required: true},
  nombreInstitucion  : {type: String, required: true},
  tiempo             : {type: String},
  costo              : {type: String, required: true},
});
//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('convenios', conveniosSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural