(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioCourier', servicioCourier);

  servicioCourier.$inject = ['$log','$http'];

  function servicioCourier($log, $http){
    const publicAPI = {
      addCourier : _addCourier,
      getCouriers : _getCouriers 
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addCourier(pnuevoCourier){
      let listaCourier = _getCouriers();
      listaCourier.push(pnuevoCourier);
      localStorage.setItem('courierLS', JSON.stringify(listaCourier));
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getCouriers(){
      let listaCourier = [];
      let listaCourierLocal = JSON.parse(localStorage.getItem("courierLS"));

      if(!listaCourierLocal){
        listaCourier = [];
      }else{
        listaCourierLocal.forEach(obj => {
          let objCourier = new courier(obj.nombreCourier);

          listaCourier.push(objCourier);
        })
      }
      return listaCourier;
    }
  };
})();