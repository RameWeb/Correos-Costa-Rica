(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioLicencias', servicioLicencias);

  servicioLicencias.$inject = ['$log','$http'];

  function servicioLicencias($log, $http){

    let publicAPI = {
      addLicencia : _addLicencia,
      getLicencias : _getLicencias,
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addLicencia(pnuevaLicencia){
      let listaLicencias = _getLicencias();
      listaLicencias.push(pnuevaLicencia);
      localStorage.setItem('licenciasLS', JSON.stringify(listaLicencias));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getLicencias(){
      let listaLicencias = [];
      let listaLicenciasLocal = JSON.parse(localStorage.getItem("licenciasLS"));

      if(listaLicenciasLocal == null){
        listaLicencias = [];
      }else{
        listaLicenciasLocal.forEach(obj => {
          
          let objLicencias = new Licencia(obj.tipo,obj.categoria,obj.descripcion);
          listaLicencias.push(objLicencias);
        })
      }

      return listaLicencias;
    }
   
    function actualizarLocal(plistaActualizada){
      localStorage.setItem('licenciasLS', JSON.stringify(plistaActualizada));
    }

  }
})();