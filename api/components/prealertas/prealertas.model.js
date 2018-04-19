//Requerimos mongoose
const mongoose = require('mongoose');

//Esquema de usuarios
var PreAlertaSchema = new mongoose.Schema({
  tracking : {type: String, required: true},
  url : {type: String, required: true},
  tipoproducto : {type: String, required: true},
  valor : {type: String, required: true},
  peso: {type: String, required: true},
  courier : {type: String, required: true},
});

//nombre del tracking dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('PreAlerta', PreAlertaSchema); 