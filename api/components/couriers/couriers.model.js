// const bcryptjs = require('bcryptjs');

//Requerimos mongoose
const mongoose = require('mongoose');

//Esquema de usuarios
var CourierSchema = new mongoose.Schema({
  idCourier: {type: String},
  nombreCourier: {type: String},
  empresaCourier: {type: String}
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Courier', CourierSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural