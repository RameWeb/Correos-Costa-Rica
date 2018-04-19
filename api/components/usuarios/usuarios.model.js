const bcryptjs = require('bcryptjs');

//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let UserSchema = new mongoose.Schema({
  tipoIdentificacion : {type: String},
  identificacion : {type: String},
  nombre1 : {type: String},
  nombre2 : {type: String},
  apellido1 : {type: String},
  apellido2 : {type: String},
  fotoPerfil : {type: String},
  sexo : {type: String},
  fechaNacimiento : {type: String},
  email : {type: String},
  contrasenna : {type: String},
  provincia : {type: String},
  canton : {type: String},
  distrito : {type: String},
  direccion : {type: String},
  estado : {type: String},
  tipoUsuario : {type: String},
  telefono : {type: String},
  sucursalPreferencia : {type:String},
  // tarjetas : {type: Array, required: false},
  paquetes: {type: Array,},
  latitud : {type: String,},
  longitud : {type: String},
});


/**
 * Función que compara la contraseña
 */
UserSchema.methods.compararContrasenna = (candidatePassword, cb) => {
  bcryptjs.compare(candidatePassword, this.contrasenna, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Usuario', UserSchema);
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural