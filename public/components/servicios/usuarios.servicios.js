(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log', '$http', 'localStorageFactories'];

  function servicioUsuarios($log, $http, localStorageFactories){

    const coleccionUsuarios = 'usuariosLS';

    let publicAPI = {
      agregarUsuario : _agregarUsuario,
      obtenerUsuario : _obtenerUsuario,
      obtenerUsuarioEspecifico : _obtenerUsuarioEspecifico,
      actualizarUsuario : _actualizarUsuario,
      obtenerUsuarioPorRol : _obtenerUsuarioPorRol,
      obtenerEmpleados : _obtenerEmpleados
    }
    return publicAPI;

    function _agregarUsuario(pNuevoUsuario){
      let listaUsuarios = _obtenerUsuario(),
          usuarioRepetido,
          registroExitoso;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(pNuevoUsuario.getEmail() == listaUsuarios[i].getEmail() ){
          usuarioRepetido = true;
        };
      };

      if(usuarioRepetido == true){
        registroExitoso = false;
      }else{
        listaUsuarios.push(pNuevoUsuario);
        console.log(listaUsuarios);
        registroExitoso = localStorageFactories.setItem(coleccionUsuarios, listaUsuarios);
      };

      return registroExitoso;
    };

    function _obtenerUsuario(){
      let listaUsuariosLocal = localStorageFactories.getItem(coleccionUsuarios),
          listaUsuarios = [];

      if(listaUsuariosLocal == []){
        listaUsuarios = [];
      }else{
        listaUsuariosLocal.forEach(obj => {

          switch (obj.tipoUsuario) {
            case "Encargado de Sucursal":
              let objTempEncargadoSucursal = new EmpleadoSucursal(obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.sucursal, obj.licencia, obj.fotoLicencia, obj.vencimientoLicencia);

              listaUsuarios.push(objTempEncargadoSucursal);
            break;
          
            case "Encargado de Aduana":
              let objTempEncargadoAduana = new EmpleadoAduana(obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.rolAduana);

              listaUsuarios.push(objTempEncargadoAduana);
            break;

            case "Repartidor":
              let objTempRepartidor = new Repartidor(obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.telefono, obj.sucursal, obj.licencia,obj.fotoLicencia, obj.licenciaVencimiento);

              listaUsuarios.push(objTempRepartidor);
            break;

            case "Cliente":
              let objTempCliente = new Cliente(obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.telefono, obj.tarjeta);

              listaUsuarios.push(objTempCliente);
            break;

            default:
              let objTempUsuario = new Usuario(obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario);

              listaUsuarios.push(objTempUsuario);
            break;
          };

        });
      };

      return listaUsuarios;
    };

    function _obtenerUsuarioEspecifico(pidUsuario){
      let listaUsuarios = _obtenerUsuario(),
          usuario;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].identificacion == pidUsuario) {
          usuario = listaUsuarios[i];
        }
      }

      console.log(usuario);

      return usuario;
    }

    function _actualizarUsuario(pUsuarioActualizado){
      let listaUsuarios = _obtenerUsuario(),
          modificacionExitosa;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(pUsuarioActualizado.getEmail() === listaUsuarios[i].getEmail()){
          listaUsuarios[i] = pUsuarioActualizado;
        };
      };
      modificacionExitosa = localStorageFactories.setItem(coleccionUsuarios, listaUsuarios);
      return modificacionExitosa;
    };

    function _obtenerUsuarioPorRol(pRol){
      let listaUsuarios = _obtenerUsuario(),
          listaUsuariosFiltrada = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getTipoUsuario() == pRol){
          listaUsuariosFiltrada.push(listaUsuarios[i]);
        }
      }

      return listaUsuariosFiltrada;
    }

    function _obtenerEmpleados(pRol){
      let listaUsuarios = _obtenerUsuario(),
          listaUsuariosFiltrada = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getTipoUsuario() != pRol){
          listaUsuariosFiltrada.push(listaUsuarios[i]);
        }
      }

      return listaUsuariosFiltrada;
    }
  };
})();