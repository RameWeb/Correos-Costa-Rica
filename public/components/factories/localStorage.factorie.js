(() => {
  'use strict';
  angular
    .module('correos-cr')
    .factory('localStorageFactories', localStorageFactories);

  localStorageFactories.$inject = ['$log', '$http'];

  function localStorageFactories($log, $http) {
    const localStorageAPI = {
      setUsuario : _setUsuario,
      getDatosUsuarios: _getDatosUsuarios,
      setItem: _setItem,
      getItem: _getItem,
      getPrealertas: _getPrealertas,
      setPrealertas: _setPrealertas,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession
    };
    return localStorageAPI;

    function _setUsuario(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_user',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'tipoIdentificacion' : data.tipoIdentificacion,
          'identificacion' : data.identificacion,
          'nombre1' : data.nombre1,
          'nombre2' : data.nombre2,
          'apellido1' : data.apellido1,
          'apellido2' : data.apellido2,
          'fotoPerfil' : data.fotoPerfil,
          'sexo' : data.sexo,
          'fechaNacimiento' : data.fechaNacimiento,
          'email' : data.email,
          'contrasenna' : data.contrasenna,
          'provincia' : data.provincia,
          'canton' : data.canton,
          'distrito' : data.distrito,
          'direccion' : data.direccion,
          'estado' : data.estado,
          'tipoUsuario' : data.tipoUsuario,
          'sucursal' : data.sucursal,
          'rolAduana' : data.rolAduana,
          'telefono' : data.telefono,
          'sucursal' : data.Sucursal,
          'licencia' : data.licencia,
          'fotoLicencia' : data.fotoLicencia,
          'licenciaVencimiento' : data.licenciaVencimiento,
          'sucursalPreferencia' : data.sucursalPreferencia,
          'prealertas': data.prealertas,
          'titularTarjeta' : data.tarjetas[0].titularTarjeta,
          'numeroTarjeta' : data.tarjetas[0].numeroTarjeta,
          'mesVencimiento' : data.tarjetas[0].mesVencimiento,
          'annoVencimiento': data.tarjetas[0].annoVencimiento,
          'ccv': data.tarjetas[0]
        }
      });

      peticion.done((res) => {
        respuesta = res.success
      });
      peticion.fail(() => {
        respuesta = false;
      });

      return respuesta;
    }

    /**
     * Funcion que obtiene los datos del back-end
     */
    function _getDatosUsuarios() {
      let listaUsuarios = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_users',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((usuarios) => {
        console.log('datos que vienen de la base de datos');
        console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
      });

      return listaUsuarios;
    }

    function _setItem(key, value) {
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));

      return response;
    };

    function _getItem(value) {
      let arrayData = JSON.parse(localStorage.getItem(value));

      if (!arrayData) {
        arrayData = [];
      }

      return arrayData;
    };

    function _setSession(value) {
      let response = true;

      sessionStorage.setItem('session', JSON.stringify(value));

      return response;
    };

    function _closeSession() {
      let response = true;

      sessionStorage.removeItem('session');

      return response;
    };

    function _getSession() {
      let sessionActive = JSON.stringify(sessionStorage.setItem('session'));

      return sessionActive;
    };

        /**
     * Funcion que obtiene los datos de las prealertas del back end y los retorna
     * @param {Objeto PreAlerta} pobjprealerta 
     */
    function _getPrealertas(pobjprealerta) {
      let listaPrealertas = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_prealertas',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
      });

      peticion.done((datos) => {
        listaPrealertas = datos;
        console.log('Petición realizada con éxito');
      });
      peticion.fail(() => {
        listaPrealertas = [];
      });

      return listaPrealertas;
    }

    /**
     * Esta funcion envia como peticion los datos de la prealerta para ser guardados en la base de datos
     * @param {Objeto de tipo prealerta} pnuevoobjprealerta 
     */
    function _setPrealertas(pnuevoobjprealerta) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_prealerta',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          tracking: pnuevoobjprealerta.tracking,
          url: pnuevoobjprealerta.url,
          tipoProducto: pnuevoobjprealerta.tipoProducto,
          valor: pnuevoobjprealerta.valor,
          peso: pnuevoobjprealerta.peso,
          courier: pnuevoobjprealerta.courier
        }
      });

      peticion.done((datos) => {
        response = datos.msj;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

  };
})();