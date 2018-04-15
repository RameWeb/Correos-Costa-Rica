  (() => {
  'use strict';
  angular
  .module('correos-cr')
  .directive('sidebarPrincipal', sidebarPrincipal);

  sidebarPrincipal.$inject = ['$state' ,'inicioSesionService'];

  function sidebarPrincipal($state, inicioSesionService){

    let sidebarController = function () {  
      const userAuth = inicioSesionService.getAuthUser();
      const vm = this;
      vm.rolUsuario = userAuth.getRol();
    };

    let navegacion = {
      templateUrl: '/components/directives/sidebar/sidebarGeneral.vista.html',
      restrict: 'E',
      controller: sidebarController,
      controllerAs: 'vm'
    };
    return navegacion;
  };
})();
