(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorConvenios', controladorConvenios);

  controladorConvenios.$inject = ['$http', '$stateParams', '$state', 'servicioConvenios'];

  function controladorConvenios($http, $stateParams, $state, servicioConvenios){
    let vm = this;

    vm.nuevoConvenio = {};

    vm.listaConvenios = listarConvenios();

    listarConvenios();

    //  registrar un nuevo tipo de producto desde el html
    vm.registrarConvenio = (pnuevoConvenio) => {
      console.log(pnuevoConvenio);

      let objNuevoConvenio = new Convenios(pnuevoConvenio.idConvenios, pnuevoConvenio.tipo,pnuevoConvenio.nombreInstitucion,  pnuevoConvenio.tiempo,pnuevoConvenio.costo);

      console.log('Objeto con el convenio');
      console.log(objNuevoConvenio);
      // Pasamos al servicio el nuevo obj de tipo de producto para ser almacenado en el localStorage
      servicioConvenios.setConvenios(objNuevoConvenio);

      // Retroalimentacion Visual para los usuarios
      swal("Registro exitoso", "el convenio ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoConvenio = null;
      listarConvenios();
    }
    function listarConvenios(){
      vm.listaConvenios= servicioConvenios.getConvenios();
    }

      vm.modificar = (pConvenios) =>{
        console.log(pConvenios);
        $state.go('modificar-convenios', {idConvenios: JSON.stringify(pConvenios)})
      }
  }
})();
 