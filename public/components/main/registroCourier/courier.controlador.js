(() => {
  'use strict';
  angular
    .module('correos-cr')
    .controller('controladorCourier', controladorCourier);

  controladorCourier.$inject = ['$stateParams', '$state', 'servicioCourier'];

  function controladorCourier($stateParams, $state, servicioCourier) {
    let vm = this;
    
    vm.nuevoCourier = {};
    vm.listaCouriers = listarCourier();
    listarCourier();

    //  registrar un nuevo tipo de producto desde el html
    vm.registrarCourier = (pnuevoCourier) => {
      console.log(pnuevoCourier);

      let objNuevoCourier = new Courier(pnuevoCourier.idCourier, pnuevoCourier.nombreCourier, pnuevoCourier.empresaCourier);

      console.log('Objeto con el courier');
      console.log(objNuevoCourier);
      // Pasamos al servicio el nuevo obj de tipo de producto para ser almacenado en el localStorage
      servicioCourier.addCourier(objNuevoCourier);

      // Retroalimentacion Visual para los usuarios
      swal("Registro exitoso", "el courier ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoCourier = null;
      listarCourier();
    }

    function listarCourier() {
      vm.listaCouriers = servicioCourier.getCouriers();
    }
  }
})();
