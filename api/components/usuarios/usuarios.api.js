const UserModel = require('./usuarios.model');      

module.exports.registrar = (req, res) => {

  let newUser = Object.assign(new UserModel(), req.body);

  // let objD = req.body;

  switch(newUser.tipoUsuario) {
    case "Empleado":
      newUser.telefono = req.body.telefono;
      newUser.sucursalPreferencia = req.body.sucursalPreferencia;
      newUser.latitud = req.body.latitud;
      newUser.longitud = req.body.longitud;
      newUser.sucursal = req.body.sucursal;
      newUser.rolAduana = req.body.rolAduana;
      newUser.telefono = req.body.telefono;
      newUser.sucursal = req.body.sucursal;
      newUser.licencia = req.body.licencia;
      newUser.fotoLicencia = req.body.fotoLicencia;
      newUser.licenciaVencimiento = req.body.licenciaVencimiento;
      newUser.rol = req.body.rol;
    break;
    
    case "Cliente":
      newUser.telefono = req.body.telefono;
      newUser.sucursalPreferencia = req.body.sucursalPreferencia;
      newUser.latitud = req.body.latitud;
      newUser.longitud = req.body.longitud;

      // let objTarj = {
      //   titularTarjeta : req.body.titularTarjeta, 
      //   numeroTarjeta: req.body.numeroTarjeta,
      //   mesVencimiento: req.body.mesVencimiento,
      //   annoVencimiento: req.body.annoVencimiento,
      //   ccv: req.body.ccv
      // }

      // // metodo de tarjetas al registrar cliente por primera vez
      // newUser.tarjetas.push(objTarj);
    break;
    default:
    break;
  }
  console.log(newUser.latitud);

  // newUser.pre('save', (next) => {
  //   var user = this;
  
  //   if (!user.isModified('password')) return next();  
  
  //   bcrypt.genSalt(10, (err, salt) => {
  //     if (err) return next(err);
  //     bcrypt.hash(user.password, salt, (err, hash) => {
  //         if (err) return next(err);
  //         user.password = hash;
  //         next();
  //     });
  //   });
  // });

  newUser.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro de usuarios' + err});
    }else{
      res.json({success:true, msg:'Se registró el usuario correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  UserModel.find().then((usuarios) => {
    res.send(usuarios);
  });
};

module.exports.actualizar = (req,res) => {
  UserModel.findByIdAndUpdate(req.body.email, { $set: req.body}, (err, usuarios) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};