  (() => {
  'use strict';
  angular
  .module('correos-cr')
  .directive('sidebarPrincipal', sidebarPrincipal);

  sidebarPrincipal.$inject = ['inicioSesionService'];

  function sidebarPrincipal(inicioSesionService){

    let sidebarController = function () {  
      let userAuth = inicioSesionService.getAuthUser();
      let vm = this;
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
