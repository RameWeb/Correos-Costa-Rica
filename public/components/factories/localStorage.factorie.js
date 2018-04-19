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
      getPrealertas: _getPrealertas,
      setPrealertas: _setPrealertas,
      setItem: _setItem,
      getItem: _getItem,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession,
      sendMail: _sendMail,
      setConvenios: _setConvenios,
      getConvenios: _getConvenios,
      getCouriers: _getCouriers,
      setCouriers: _setCouriers,
      agregarSucursal : _agregarSucursal,
      obtenerSucursal : _obtenerSucursal,
      actualizarConvenio : _actualizarConvenio
    };
    return localStorageAPI;

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
        // console.log('datos que vienen de la base de datos');
        // console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
        console.log('Ocurrió un error');
      });

      return listaUsuarios;
    }

      /**
     * Toma el objejeto y o envía al backend por una petición de $ajax
     * @param {objeto usuario} data 
     */

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
          'provincia' : data.provincia.name,
          'canton' : data.canton.name,
          'distrito' : data.distrito.name,
          'direccion' : data.direccion,
          'estado' : data.estado,
          'tipoUsuario' : data.tipoUsuario,
          'sucursal' : data.sucursal,
          'rol' : data.rol,
          'rolAduana' : data.rolAduana,
          'telefono' : data.telefono,
          'sucursal' : data.Sucursal,
          'licencia' : data.licencia,
          'fotoLicencia' : data.fotoLicencia,
          'licenciaVencimiento' : data.licenciaVencimiento,
          'sucursalPreferencia' : data.sucursalPreferencia,
          'prealertas': data.prealertas,
          // 'titularTarjeta' : data.tarjetas.titularTarjeta,
          // 'numeroTarjeta' : data.tarjetas.numeroTarjeta,
          // 'mesVencimiento' : data.tarjetas.mesVencimiento,
          // 'annoVencimiento': data.tarjetas.annoVencimiento,
          // 'ccv': data.tarjetas.ccv,
          'latitud': data.latitud,
          'longitud': data.longitud,
        }
      });

      peticion.done((res) => {
        respuesta = res.success
        console.log('objeto registrado'+data);
      });
      peticion.fail(() => {
        console.log('Prueba FAIL'+data);
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
          'idConvenios': data.idConvenios,
          'tipo': data.tipo,
          'nombreInstitucion': data.nombreInstitucion,
          'tiempo': data.tiempo,
          'costo': data.costo,
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


    function _agregarSucursal(data) {
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
          'latitude' : data.latitude,
          'longitude' : data.longitude,
          'direccion' : data.direccion,
          'telefono' : data.telefono
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


    function _obtenerSucursal() {
      let listaSucursales = [];

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
        listaSucursales = sucursales;
      });
      peticion.fail(() => {
        listaSucursales = [];
      });

      return listaSucursales;
    }

    function _setItem(key, value) {
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));
    }

    function _getItem(value) {
      let arrayData = JSON.parse(localStorage.getItem(value));

      if (!arrayData) {
        arrayData = [];
      }

      return arrayData;
    };

      /**
     * Funcion que modifica los datos del back-end
     */
     function _actualizarConvenio(data) {
      let respuesta;
      let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_convenios',
        type: 'put',
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
      let sessionActive = JSON.parse(sessionStorage.getItem('session'))
      return sessionActive;
    };

    function _sendMail(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/mail',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'to': data.to,
          'subject': data.subject,
          'text': data.text
        }
      });

      peticion.done((datos) => {
        console.log(datos);
      });
      peticion.fail((error) => {
        response = error;
        console.log(error);
      });
    }

    function _getCouriers() {
      let listaCouriers = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_couriers',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {},
      });

      peticion.done(couriers => {
        console.log('Datos que vienen desde la base de datos');
        console.log(couriers);
        listaCouriers = couriers;
      });
      peticion.fail(() => {
        listaCouriers = [];
        console.log('Ocurrió un error');
      });

      return listaCouriers;
    }

    function _setCouriers(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_courier',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          idCourier: data.idCourier,
          nombreCourier: data.nombreCourier,
          empresaCourier: data.empresaCourier
        },
      });

      peticion.done((res) => {
        respuesta = res.success
      });
      peticion.fail(() => {
        respuesta = false;
      });

      return respuesta;
    }

    //CHRISTINE

    function _getPrealertas() {
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

      peticion.done((prealertas) => {
        console.log('Prealertas que vienen de la base de datos');
        listaPrealertas = prealertas;;
      });
      peticion.fail(() => {
        listaPrealertas = [];
      });

      return listaPrealertas;
    }

    function _setPrealertas(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_prealerta',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'tracking': data.tracking,
          'url': data.url,
          'tipoProducto': data.tipoProducto,
          'valor': data.valor,
          'peso': data.peso,
          'courier': data.courier,
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