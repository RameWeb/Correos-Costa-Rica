(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioProvincia', servicioProvincia);

  servicioProvincia.$inject = ['$log','$http'];

  function servicioProvincia($log, $http){
    const publicAPI = {
      addProvincia : _addProvincia,
      getProvincias : _getProvincias 
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addProvincia(pnuevaProvincia){
      let listaProvincia = _getProvincias();
      listaProvincia.push(pnuevaProvincia);
      localStorage.setItem('ProvinciaLS', JSON.stringify(listaProvincia));
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getProvincias(){
      let listaProvincia = [];
      let listaProvinciaLocal = JSON.parse(localStorage.getItem("ProvinciaLS"));

      if(!listaProvinciaLocal){
        listaProvincia = [];
      }else{
        listaProvinciaLocal.forEach(obj => {
          let objProvincia = new provincia(obj.nombreProvincia);

          listaProvincia.push(objProvincia);
        })
      }
      return listaProvincia;
    }
  };
})();