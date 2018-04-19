//Requerimos mongoose
const mongoose = require('mongoose');

//Esquema de usuarios
var PreAlertaSchema = new mongoose.Schema({
  tracking : String,
  url : String,
  tipoProducto : String,
  valor : String,
  peso: String,
  courier : String
});

//nombre del tracking dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('PreAlerta', PreAlertaSchema); 