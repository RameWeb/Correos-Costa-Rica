(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('mainController', mainController);

  mainController.$inject = ['$state', 'inicioSesionService']

  function mainController($state, inicioSesionService){
    let vm = this;

    vm.authUser = inicioSesionService.getAuthUser();

    if(!vm.authUser){
      $state.go('iniciarSesion');
    }
  }
})();