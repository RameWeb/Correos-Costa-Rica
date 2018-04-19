(() => {
  'use strict';
  angular
  .module('correos-cr')
  .service('servicioCourier', servicioCourier);

  servicioCourier.$inject = ['$log','$http','localStorageFactories'];

  function servicioCourier($log, $http, localStorageFactories){
    const publicAPI = {
      addCourier : _addCourier,
      getCouriers : _getCouriers 
    };
    return publicAPI;

    // Funcion que almacena en el localStorage todas las fiestas programadas
    function _addCourier(pnuevoCourier) {
      let listaCouriers = _getCouriers(),
        registroExitoso,
        courierRepetido = false;

      for (let i = 0; i < listaCouriers.length; i++) {
        if (pnuevoCourier.id == listaCouriers[i].id) {

          courierRepetido = true;
        }
      }
      if (courierRepetido === false) {
        registroExitoso = localStorageFactories.setCouriers(pnuevoCourier);

      } else {
        registroExitoso = false;
      }
      return registroExitoso;
    }

    // Funcion que trae todas las fiestas programadas del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo fiesta
    function _getCouriers(){
      let listaCouriers = [];
      let listaCouriersBD = localStorageFactories.getCouriers();

      if(listaCouriersBD == null){
        listaCouriers = [];
      }else{
        listaCouriersBD.forEach(obj => {
          let objCourier = new Courier(
            obj.idCourier, 
            obj.nombreCourier, 
            obj.empresaCourier);

          listaCouriers.push(objCourier);
        });
      }
      return listaCouriers;
    }
  };
})();