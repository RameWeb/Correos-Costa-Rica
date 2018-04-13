(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioCanton', servicioCanton);

  servicioCanton.$inject = ['$log','$http'];

  function servicioCanton($log, $http){
    const publicAPI = {
      addCanton : _addCanton,
      getCantones : _getCantones 
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addCanton(pnuevoCanton){
      let listaCanton = _getCantones();
      listaCanton.push(pnuevoCanton);
      localStorage.setItem('CantonLS', JSON.stringify(listaCanton));
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getCantones(){
      let listaCanton = [];
      let listaCantonLocal = JSON.parse(localStorage.getItem("CantonLS"));

      if(!listaCantonLocal){
        listaCanton = [];
      }else{
        listaCantonLocal.forEach(obj => {
          let objCanton = new canton(obj.nombreCanton);

          listaCanton.push(objCanton);
        })
      }
      return listaCanton;
    }
  };
})();