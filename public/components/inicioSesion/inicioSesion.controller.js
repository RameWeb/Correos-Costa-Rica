(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('inicioSesionController', inicioSesionController);

  inicioSesionController.$inject = ['$stateParams','$state','inicioSesionService'];

  function inicioSesionController($stateParams,$state,inicioSesionService){
    const vm = this;

    vm.nuevaSesion = {};

    vm.iniciarSesion = (pcredenciales) => {

      let inicioSesion = inicioSesionService.logIn(pcredenciales);

      console.log(inicioSesion);

      if(inicioSesion == true){
        swal({
          title: "Bienvenido",
          text: "Inicio de sesión exitoso",
          icon: "success",
          button: "Aceptar",
        });
        $state.go('main');
      }else{
        swal({
          title: "Inicio de sesión fallido",
          text: "Los datos ingresados son incorrectos",
          icon: "error",
          button: "Aceptar",
        });
      }
    };
  };
})();