(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioSucursales', servicioSucursales);

  servicioSucursales.$inject = ['$log','$http', 'localStorageFactories'];

  function servicioSucursales($log, $http, localStorageFactories){

    const publicAPI = {
      setSucursal : _setSucursal,
      getSucursal : _getSucursal,
      obtenerSucursalSeleccionada: _obtenerSucursalSeleccionada,
      actualizarSucursal: _actualizarSucursal
    }
    return publicAPI;
    
    // Funcion que almacena en el localStorage todos los usuarios
    function _setSucursal(pnuevaSucursal){
      let listaSucursales = _getSucursal();
      let registro =  localStorageFactories.setSucursal(pnuevaSucursal);
      
       return registro;
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getSucursal(){
      let listaSucursales = [];
      let listaSucursalesLocal = localStorageFactories.getSucursal();

      if(listaSucursalesLocal == null){
        listaSucursales = [];
      }else{
        listaSucursalesLocal.forEach(obj => {
          
          let objSucursales = new Sucursales(obj.idSucursal, obj.nombreSucursal, obj.position, obj.direccion, obj.telefono);

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