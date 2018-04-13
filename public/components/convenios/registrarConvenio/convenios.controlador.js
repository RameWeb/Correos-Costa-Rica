(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorConvenios', controladorConvenios);

  controladorConvenios.$inject = ['$stateParams', '$state', 'servicioConvenios'];

  function controladorConvenios($stateParams, $state, servicioConvenios){

    let vm = this;

    vm.nuevoConvenios = {};
    vm.listaConvenios = listarConvenios();

    listarConvenios();
    vm.registrarConvenios = (pnuevoConvenios) => {

      console.log(pnuevoConvenios);

      let objNuevoConvenios = new Convenios(pnuevoConvenios.nombreInstitucion, pnuevoConvenios.tipo, pnuevoConvenios.tiempo, pnuevoConvenios.costo);
     
      console.log('objeto con usuario');
      console.log(objNuevoConvenios);

      servicioConvenios.addConvenios(objNuevoConvenios);

      swal("Registro exitoso", "El convenio ha sido registrado correctamente", "success", {
        button: "Aceptar", 
      });

      vm.nuevoConvenios = null;
      listarConvenios();
    }

    
   

    function listarConvenios() {
      vm.listaConvenios = servicioConvenios.getConvenios();
     
     
    }
  }
  
  
})();