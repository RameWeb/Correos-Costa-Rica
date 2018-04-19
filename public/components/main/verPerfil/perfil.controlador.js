(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('verPerfilControlador', verPerfilControlador);

  verPerfilControlador.$inject = ['servicioUsuarios', 'inicioSesionService']

  function verPerfilControlador(servicioUsuarios, inicioSesionService){
    const vm = this;

    const userAuth = inicioSesionService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }else{
      vm.usuarioActivo = userAuth.getNombreCompleto();
    }

    vm.userInfo = userAuth;
  };
})();