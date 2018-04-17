(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarConvenios', controladorModificarConvenios);

  controladorModificarConvenios.$inject = ['$http', '$stateParams', '$state', 'servicioConvenios'];

  function controladorModificarConvenios($http, $stateParams, $state, servicioConvenios){
    let vm = this;

    if($stateParams.idConvenios == ''){
      $state.go('lista-convenios');
    }

    let idConvenio = JSON.parse($stateParams.idConvenios);
    console.log(idConvenio);

    vm.nuevoConvenio = servicioConvenios.obtenerConvenioSeleccionado(idConvenio);

    // vm.nuevoConvenio  = ConvenioSeleccionado;

    vm.modificarConvenio = (pnuevoConvenio) =>{

      let convenioModificado = new Convenios(pnuevoConvenio.idConvenios,pnuevoConvenio.tipo, pnuevoConvenio.nombreInstitucion, pnuevoConvenio.tiempo,pnuevoConvenio.costo);

    console.log(convenioModificado);

    //   // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
       vm.convenioSeleccionado = servicioConvenios.actualizarConvenio(convenioModificado);

    //   // Retroalimentacion Visual para los usuarios: SweetAlert
       swal("Registro exitoso", "El convenio se ha sido modificado correctamente", "success", {
       button: "Aceptar",
      });

      $state.go('lista-convenios');

      listarConvenios();

    //   // Se limpia el formulario
      vm.nuevoConvenio = null;
    }

    // Imprimir lista de repartidores en el sistema
     function listarConvenios(){
       vm.listaConvenios= servicioConvenios.getConvenios();
     }
  }
})();


