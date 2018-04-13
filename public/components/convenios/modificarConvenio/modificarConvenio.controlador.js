(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarConvenios', controladorModificarConvenios);

  controladorModificarConvenios.$inject = ['$http', '$stateParams', '$state', 'servicioConvenios'];

  function controladorModificarConvenios($http, $stateParams, $state, servicioConvenios){

    let conveniosSeleccionada;

    if($stateParams.idConvenios == ''){
      $state.go('lista-convenios');
    }else{
      conveniosSeleccionada = servicioConvenios.getConveniosSeleccionada($stateParams.idConvenios);
    }

    // console.log(conveniosSeleccionada);

    let vm = this;
    

    vm.nuevoConvenios = {
      nombreInstitucion: conveniosSeleccionada.nombreInstitucion,
      tipo: conveniosSeleccionada.tipo,
      tiempo: conveniosSeleccionada.tiempo,
      costo: conveniosSeleccionada.costo,
      
    };

    // listarSucursales();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.modificarConvenios = (pnuevoConvenios) => {

      let idConvenios = conveniosSeleccionada.idConvenios;

      let objConveniosModificada = new Convenios(vm.nuevoConvenios.nombreInstitucion, vm.nuevoConvenios.tipo, vm.nuevoConvenios.tiempo, vm.nuevoConvenios.costo, idConvenios);
        
      console.log(objConveniosModificada);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.conveniosSeleccionada = servicioConvenios.actualizarConvenios(objConveniosModificada);

      swal("Registro exitoso", "El convenio se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('lista-convenios');

      listarConvenios();
      // Se limpia el formulario
      vm.nuevoConvenios = null;
    }

    function listarConvenios(){
      vm.listaConvenios = servicioConvenios.getConvenios();
    }

  }
})();