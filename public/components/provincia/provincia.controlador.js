(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorProvincia', controladorProvincia);

  controladorProvincia.$inject = ['$stateParams', '$state', 'servicioProvincia'];

  function controladorProvincia($stateParams, $state, servicioProvincia){
    let vm = this;
    vm.nuevaProvincia = {};
    vm.listaProvincias = listarProvincia();
    listarProvincia();

    //  registrar un nuevo tipo de producto desde el html
    vm.registrarProvincia = (pnuevaProvincia) => {
      console.log(pnuevaProvincia);
      let objNuevaProvincia = new provincia(pnuevaProvincia.nombreProvincia );

      console.log('Objeto con la provincia');
      console.log(objNuevaProvincia);
      // Pasamos al servicio el nuevo obj de tipo de producto para ser almacenado en el localStorage
      servicioProvincia.addProvincia(objNuevaProvincia);

      // Retroalimentacion Visual para los usuarios
      swal("Registro exitoso", "La provincia ha sido registrada correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevaProvincia = null;
      listarProvincia();
    }
    function listarProvincia(){
      vm.listaProvincias= servicioProvincia.getProvincias();
    }

  }
})();