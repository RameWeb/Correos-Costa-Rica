(() => {
  'use strict';
  angular
    .module('correos-cr')
    .directive('navegacionPrincipal', navegacionPrincipal);

  navegacionPrincipal.$inject = ['$state', 'inicioSesionService'];

  function navegacionPrincipal($state, inicioSesionService) {

    let navegacionPrincipalControlador = function () {
      let vm = this;
      vm.putito = (inicioSesionService.getAuthUser()).getNombre();
      console.log(vm.putito);
      angular.element('#btnCerrarSesion').on('click', function () {
        swal("Desea cerrar la sesión?", {
          buttons: {
            cancel: "Cancelar",
            cerrarSesion: {
              text: "Cerrar sesión",
              value: "cerrarSesion",
            },
          },
        })
          .then((value) => {
            switch (value) {
              case "cerrarSesion":
                inicioSesionService.logOut();
                $state.go('iniciarSesion');
                swal({
                  title: "Sesión cerrada correctamente",
                  text: "Se ha finalizado su sesión correctamente",
                  icon: "success",
                  button: "Aceptar",
                });
                break;

              default:
                break;
            }
          })
      }
      )
    };

    let navegacion = {
      templateUrl: '/components/directives/nav/navPrinicipal.vista.html',
      restrict: 'EA',
      require: "ngClick",
      controller: navegacionPrincipalControlador,
      controllerAs: 'vm'
    };
    return navegacion;
  };
})();
