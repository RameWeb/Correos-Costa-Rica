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
      obtenerEmpleados : _obtenerEmpleados,
      addPrealertas : _addPrealertas,
      getPrealertas: _getPrealertas,
      getPrealertasPorUsuario: _getPrealertasPorUsuario,
      getInfoPrealertas: _getInfoPrealertas
    }
    return publicAPI;

    function _agregarUsuario(pNuevoUsuario){
      let listaUsuarios = _obtenerUsuario(),
          usuarioRepetido,
          registroExitoso;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(pNuevoUsuario.getCorreo() == listaUsuarios[i].getCorreo() ){
          usuarioRepetido = true;
        };
      };

      if(usuarioRepetido == true){
        registroExitoso = false;
      }else{
        console.log(pNuevoUsuario);
        registroExitoso = localStorageFactories.setUsuario(pNuevoUsuario);
      };

      return registroExitoso;
    };

    function _obtenerUsuario(){
      let listaUsuariosLocal = localStorageFactories.getDatosUsuarios(),
          listaUsuarios = [];

      if(listaUsuariosLocal == []){
        listaUsuarios = [];
      }else{
        listaUsuariosLocal.forEach(obj => {

          switch (obj.tipoUsuario) {
            case "Encargado de Sucursal":
              let objTempEncargadoSucursal = new EmpleadoSucursal(obj.tipoIdentificacion,obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.sucursal, obj.licencia, obj.fotoLicencia, obj.vencimientoLicencia, obj.rol);

              listaUsuarios.push(objTempEncargadoSucursal);
            break;
          
            case "Encargado de Aduana":
              let objTempEncargadoAduana = new EmpleadoAduana(obj.tipoIdentificacion,obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.rolAduana, obj.rol);

              listaUsuarios.push(objTempEncargadoAduana);
            break;

            case "Repartidor":
              let objTempRepartidor = new Repartidor(obj.tipoIdentificacion, obj.identificacion, obj.nombre, obj.apellido1, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.telefono, obj.sucursal, obj.licencia,obj.fotoLicencia, obj.licenciaVencimiento, obj.rol);

              listaUsuarios.push(objTempRepartidor);
            break;

            case "Cliente":
              let objTempCliente = new Cliente(obj.tipoIdentificacion, obj.identificacion, obj.nombre1, obj.nombre2, obj.apellido1, obj.apellido2, obj.fotoPerfil, obj.sexo, obj.fechaNacimiento, obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario, obj.telefono, obj.sucursalPreferencia);

              obj.tarjetas.forEach(objTarj => {
                let objTempTarjeta = new Tarjeta(objTarj.titularTarjeta, objTarj.numeroTarjeta, objTarj.fechaVencimiento, objTarj.ccv);
                objTempCliente.agregarTarjeta(objTempTarjeta);
              })
              listaUsuarios.push(objTempCliente);
            break;

            default:
              let objTempUsuario = new Usuario(obj.tipoIdentificacion, obj.identificacion, obj.nombre1, obj.nombre2, obj.apellido1, obj.apellido2, obj.fotoPerfil, obj.sexo, obj.fechaNacimiento,obj.email, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.direccion, obj.estado, obj.tipoUsuario);

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
        if(pUsuarioActualizado.getCorreo() === listaUsuarios[i].getCorreo()){
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

    /**
     * Función que retorna todas las prealertas
     */
    function _getPrealertas(pprealerta) {
      let listaPrealertas = [],
        listaPrealertasBD = localStorageFactories.getPrealertas();

        listaPrealertasBD.forEach(obj => {
        let objPrealerta = new Prealertas(obj.tracking, obj.Url, obj.tipoproducto,obj.valor, obj.peso, obj.courier);

        listaPrealertas.push(objPrealerta);
      });
      return listaPrealertas;
    }

    /**
     * Función que registra la prealerta dentro del usuario activo
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Objeto de tipo prealerta} pprealerta 
     */
    function _addPrealertas(pprealerta) {
      let listaPrealertas = _getPrealertas(),
          listaUsuariosLocal = localStorageFactories.getDatosUsuarios(),
          prealertaRepetida = false,
          registroValido;

      for(let i = 0; i < listaPrealertas.length; i++){
        if(listaPrealertas[i].gettracking() == pprealerta.gettracking()){
          prealertaRepetida = true;
        }
      }

      if (prealertaRepetida == false) {
        for(let i = 0; i < listaPrealertas.length; i++){
          if(listaPrealertas[i].getcedula() == pprealerta.getCedulaDuenno()){
            listaPrealertas[i].agregarPrealertas(pprealerta.gettracking());
          }
        }
        registroValido = localStorageFactories.setPrealertas(pprealerta);
      } else {
        registroValido = false;
      }

      return registroValido;
    }

    /**
     * Función que recibe el número de cédula del usuario activo y retorna las prealertas registrados para ese usuario
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     */
    function _getPrealertasPorUsuario(pidUsuarioActivo) {
      let listaAllPrealertas = _getPrealertas(),
        listaPrealertas = [];

      for (let i = 0; i < listaAllPrealertas.length; i++) {
        if (pidUsuarioActivo == listaAllPrealertas[i].getCedulaDuenno()) {
          listaPrealertas.push(listaAllPrealertas[i]);
        }
      }
      return listaPrealertas;
    }

    /**
     * Función que obtiene los datos de una prealerta y los retorna
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Tracking de la prealerta} ptrackingid 
     */
    function _getInfoPrealertas(pidUsuarioActivo, ptrackingid) {
      let listaPrealertasPorUsuario = _getPrealertasPorUsuario(pidUsuarioActivo),
        prealertaActiva;

      for (let i = 0; i < listaPrealertasPorUsuario.length; i++) {
        if (listaPrealertasPorUsuario[i].gettracking() == ptrackingid) {
          prealertaActiva = listaPrealertasPorUsuario[i];
        }
      }

      return prealertaActiva;
    }
  };
})();