const bcryptjs = require('bcryptjs');

//Requerimos mongoose
let mongoose = require('mongoose');

//Esquema de usuarios
let UserSchema = new mongoose.Schema({
  tipoIdentificacion : {type: String, required: true},
  identificacion : {type: String, required: true},
  nombre1 : {type: String, required: true},
  nombre2 : {type: String},
  apellido1 : {type: String, required: true},
  apellido2 : {type: String},
  fotoPerfil : {type: String, required: true},
  sexo : {type: String, required: true},
  fechaNacimiento : {type: String, required: true},
  email : {type: String, required: true},
  contrasenna : {type: String, required: true},
  provincia : {type: String, required: true},
  canton : {type: String, required: true},
  distrito : {type: String, required: true},
  direccion : {type: String, required: true},
  estado : {type: String, required: true},
  tipoUsuario : {type: String, required: true},
  tarjetas : {type: Array},
  paquetes: {type: Array},
  latitud : {type: String},
  longitud : {type: String}
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