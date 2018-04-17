(() => {
  'use strict';
  angular
    .module('correos-cr')
    .factory('localStorageFactories', localStorageFactories);

  localStorageFactories.$inject = ['$log', '$http'];

  function localStorageFactories($log, $http) {
    const localStorageAPI = {
      setUsuario : _setUsuario,
      setEmpleado : _setEmpleado,
      getDatosUsuarios: _getDatosUsuarios,
      setItem: _setItem,
      getItem: _getItem,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession,
      setConvenios:_setConvenios,
      getConvenios : _getConvenios,
      setSucursales:_setSucursales,
      getSucursales: _getSucursales
      
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
          'titularTarjeta' : data.tarjetas[0].titularTarjeta,
          'numeroTarjeta' : data.tarjetas[0].numeroTarjeta,
          'mesVencimiento' : data.tarjetas[0].mesVencimiento,
          'annoVencimiento': data.tarjetas[0].annoVencimiento,
          'ccv': data.tarjetas[0].ccv,
          'latitud': data.latitud,
          'longitud': data.longitud
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

    function _setConvenios(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_convenios',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'idConvenios' : data.idConvenios,
          'tipo' : data.tipo,
          'nombreInstitucion' : data.nombreInstitucion,
          'tiempo' : data.tiempo,
          'costo' : data.costo,
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

    function _setSucursales(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_sucursales',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'idSucursal' : data.idSucursal,
          'nombreSucursal' : data.nombreSucursal,
          'ubicacion' : data.nombreInstitucion,
          'direccion' : data.direccion,
          'telefono' : data.telefono,
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

    function _getConvenios() {
      let listaConvenios = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_convenios',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((convenios) => {
        console.log('datos que vienen de la base de datos');
        console.log(convenios);
        listaConvenios = convenios;
      });
      peticion.fail(() => {
        listaConvenios = [];
      });

      return listaConvenios;
    }

    function _getSucursales() {
      let listarSucursales = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_sucursales',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((sucursales) => {
        console.log('datos que vienen de la base de datos');
        console.log(sucursales);
        listarSucursales = sucursales;
      });
      peticion.fail(() => {
        listarSucursales = [];
      });

      return listarSucursales;
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
      let sessionActive = JSON.parse(sessionStorage.getItem('session'));

      return sessionActive;
    };

    //CHRISTINE

    function _setEmpleado(data) {
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
          'sucursalPreferencia' : data.sucursalPreferencia
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

  };
})();