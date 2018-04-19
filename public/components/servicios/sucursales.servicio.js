(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioSucursales', servicioSucursales);

  servicioSucursales.$inject = ['$log','$http', 'localStorageFactories'];

  function servicioSucursales($log, $http, localStorageFactories){

    const publicAPI = {
      agregarSucursal : _agregarSucursal,
      obtenerSucursal : _obtenerSucursal,
      obtenerSucursalSeleccionada: _obtenerSucursalSeleccionada,
      actualizarSucursal: _actualizarSucursal
    }
    return publicAPI;
    
    // Funcion que almacena en el localStorage todos los usuarios
    function _agregarSucursal(pnuevaSucursal){
      let listaSucursales = _obtenerSucursal();
      let registro =  localStorageFactories.agregarSucursal(pnuevaSucursal);
      
       return registro;
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _obtenerSucursal(){
      let listaSucursales = [];
      let listaSucursalesLocal = localStorageFactories.obtenerSucursal();

      if(listaSucursalesLocal == null){
        listaSucursales = [];
      }else{
        listaSucursalesLocal.forEach(obj => {
          
          let objSucursales = new Sucursales(obj.idSucursal, obj.nombreSucursal, obj.latitude, obj.longitude, obj.direccion, obj.telefono);

          listaSucursales.push(objSucursales);
        })
      }

      return listaSucursales;
    }

    function _obtenerSucursalSeleccionada(idSucursal){
      let listaSucursales = _obtenerSucursal();
      let sucursalSeleccionada;

      for(let i = 0; i < listaSucursales.length; i++){
        if (idSucursal == listaSucursales[i].idSucursal){
          sucursalSeleccionada = listaSucursales[i];
          // console.log(sucursalSeleccionada);
          return sucursalSeleccionada;
        }
      }
    }

    function _actualizarSucursal(psucursalModificada){
      let listaSucursales = _obtenerSucursal();

      for(let i = 0; i < listaSucursales.length; i++){
        if (psucursalModificada.idSucursal == listaSucursales[i].idSucursal){
          listaSucursales[i] = psucursalModificada;
          // console.log(listaSucursales[i]);

          localStorage.setItem('sucursalesLS', JSON.stringify(listaSucursales)); 
        }
      }
    }

    // console.log(_obtenerSucursal());
  }
})();