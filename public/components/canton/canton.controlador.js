(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorCanton', controladorCanton);

  controladorCanton.$inject = ['$stateParams', '$state', 'servicioCanton'];

  function controladorCanton($stateParams, $state, servicioCanton){
    let vm = this;
    vm.nuevoCanton = {};
    vm.listaCantones = listarCanton();
    listarCanton();

    //  registrar un nuevo tipo de producto desde el html
    vm.registrarCanton = (pnuevoCanton) => {
      console.log(pnuevoCanton);
      let objNuevoCanton = new canton(pnuevoCanton.nombreCanton );

      console.log('Objeto con el canton');
      console.log(objNuevoCanton);
      // Pasamos al servicio el nuevo obj de tipo de producto para ser almacenado en el localStorage
      servicioCanton.addCanton(objNuevoCanton);

      // Retroalimentacion Visual para los usuarios
      swal("Registro exitoso", "el canton ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoCanton = null;
      listarCanton();
    }
    function listarCanton(){
      vm.listaCantones= servicioCanton.getCantones();
    }

  }
})();