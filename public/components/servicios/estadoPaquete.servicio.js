(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioEstadoPaquete', servicioEstadoPaquete);

  servicioEstadoPaquete.$inject = ['$log','$http'];

  function servicioEstadoPaquete($log, $http){

    let publicAPI = {
      addEstadoPaquete : _addEstadoPaquete,
      getEstadoPaquete : _getEstadoPaquete,
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addEstadoPaquete(pnuevaEstadoPaquete){
      let listaEstadoPaquete = _getEstadoPaquete();
      listaEstadoPaquete.push(pnuevaEstadoPaquete);
      localStorage.setItem('EstadoPaqueteLS', JSON.stringify(listaEstadoPaquete));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getEstadoPaquete(){
      let listaEstadoPaquete = [];
      let listaEstadoPaqueteLocal = JSON.parse(localStorage.getItem("EstadoPaqueteLS"));

      if(listaEstadoPaqueteLocal == null){
        listaEstadoPaquete = [];
      }else{
        listaEstadoPaqueteLocal.forEach(obj => {
          
          let objEstadoPaquete = new EstadoPaquete(obj.estado);
          listaEstadoPaquete.push(objEstadoPaquete);
        })
      }

      return listaEstadoPaquete;
    }
   
    function actualizarLocal(plistaActualizada){
      localStorage.setItem('EstadoPaqueteLS', JSON.stringify(plistaActualizada));
    }

  }
})();