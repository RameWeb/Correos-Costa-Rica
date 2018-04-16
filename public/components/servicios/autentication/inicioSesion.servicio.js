(() => {
  'use strict';
  angular
    .module('correos-cr')
    .service('inicioSesionService', inicioSesionService);

  inicioSesionService.$inject = ['servicioUsuarios', 'localStorageFactories'];

  function inicioSesionService(servicioUsuarios, localStorageFactories) {

    const sesionAPI = {
      logIn : _logIn,
      logOut : _logOut,
      getAuthUser : _getAuthUser
    };
    return sesionAPI;

    /**
     * Funcion que inicia sesión
     * @param {Objeto que tiene el email y la contraseña} pCredenctiales 
     */
    function _logIn(pCredenctiales) {
      const listaUsuarios = servicioUsuarios.obtenerUsuario();
      let inicioSesionExitoso = false,
        credencialesCorrectas = {};

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getEmail() == pCredenctiales.email && listaUsuarios[i].getPassword() == pCredenctiales.contrasenna) {
          credencialesCorrectas.correo = listaUsuarios[i].getEmail();
          credencialesCorrectas.rol = listaUsuarios[i].getRol();
          inicioSesionExitoso = localStorageFactories.setSession(credencialesCorrectas);
          return inicioSesionExitoso;
        };
      };
    };

    /**
     * Funcion que cierra la sesion
     */
    function _logOut() {
      let cierreExitoso = localStorageFactories.closeSession();

      return cierreExitoso;
    };

    /**
     * Funcion que retorna los datos del usuario activo
     */
    function _getAuthUser() {
      let sessionActiva = localStorageFactories.getSession(),
        usuarioActivo;

      if (!sessionActiva) {
        usuarioActivo = undefined;
      } else {
        usuarioActivo = obtenerDatosUsuarioActivo(sessionActiva);
      }

      return usuarioActivo;
    };

    /**
     * Funcion que obtiene los datos del usuario
     * @param {Objeto que posee el email y el rol del usuario logeado} sessionActiva 
     */
    function obtenerDatosUsuarioActivo(sessionActiva){
      let listaUsuarios = servicioUsuarios.obtenerUsuario(),
          datosUsuario;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getEmail() == sessionActiva.correo){
          datosUsuario = listaUsuarios[i];
        }
      };

      return datosUsuario;
    }
  };
})();