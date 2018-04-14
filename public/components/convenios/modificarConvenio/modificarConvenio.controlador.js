(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarConvenios', controladorModificarConvenios);

  controladorModificarConvenios.$inject = ['$http', '$stateParams', '$state', 'servicioConvenios'];

  function controladorModProducto($http, $stateParams, $state, servicioConvenios){
    let vm = this;

    let ConvenioSeleccionado;

    if($stateParams.idConvenios == ''){
      $state.go('ListaConvenio');
    }

    ConvenioSeleccionado = servicioConvenios.obtenerConvenioSeleccionado(JSON.parse($stateParams.idConvenios));

    vm.nuevoConvenio  = ConvenioSeleccionado;

    vm.modificarConvenio = (pnuevoConvenio) =>{

      let convenioModificado = new Convenios(pnuevoConvenio.nombreInstitucion, pnuevoConvenio.tipo, pnuevoConvenio.tiempo,pnuevoConvenio.costo,pnuevoConvenio.idConvenios);

    console.log(convenioModificado);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.convenioSeleccionado = servicioConvenios.actualizarConvenio(convenioModificado);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El convenio se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('lista-convenios');

      listarConvenios();

      // Se limpia el formulario
      vm.nuevoConvenio = null;
    }

    // Imprimir lista de repartidores en el sistema
    function listarConvenios(){
      vm.listaConvenios= servicioConvenios.getConvenios();
    }
  }
})();


