(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioCasillero', servicioCasillero);

  servicioCasillero.$inject = ['$log','$http'];

  function servicioCasillero($log, $http){

    let publicAPI = {
      addCasillero : _addCasillero,
      getCasillero : _getCasillero
     
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addCasillero(pnuevaCasillero){
      let listaCasillero = _getCasillero();
      listaCasillero.push(pnuevaCasillero);
      localStorage.setItem('casilleroLS', JSON.stringify(listaCasillero));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getCasillero(){
      let listaCasillero = [];
      let listaCasilleroLocal = JSON.parse(localStorage.getItem("casilleroLS"));

      if(listaCasilleroLocal == null){
        listaCasillero = [];
      }else{
        listaCasilleroLocal.forEach(obj => {
          
          let objCasillero = new Casillero(obj.idRandom);

          listaCasillero.push(objCasillero);
        })
      }

      return listaCasillero;
    }

   
    }

  
    // console.log(_getSucursal());
  
})();