(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModificarPaquetes', controladorModificarPaquetes);

  controladorModificarPaquetes.$inject = ['$http','$stateParams', '$state', 'servicioPaquetes'];

  function controladorModificarPaquetes($http, $stateParams, $state, servicioPaquetes){
    let vm = this;
    let paquetesSeleccionado;

    if($stateParams.idPaquetes == ''){
      $state.go('listarPaquetes')
    }else{
      paquetesSeleccionado = servicioPaquetes.getPaquetesSeleccionado($stateParams.idPaquetes);
    }

    //console.log(PaquetesSeleccionado);

    

    vm.nuevoPaquetes = {
      tracking: paquetesSeleccionado.tracking,
      nombre: paquetesSeleccionado.nombre,
      peso: paquetesSeleccionado.peso,
      valor: paquetesSeleccionado.valor,
      repartidor: paquetesSeleccionado.repartidor,
      estado: paquetesSeleccionado.estado,
     
    };

    // listarPrealertas();
    
    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.modificarPaquetes = (pnuevoPaquetes) => {

      let idPaquetes = paquetesSeleccionado.idPaquetes;
      
      // console.log(pnuevaPrealerta);

      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objPaquetesModificado = new Paquetes(vm.nuevoPaquetes.tracking, vm.nuevoPaquetes.nombre, vm.nuevoPaquetes.peso,  vm.nuevoPaquetes.valor, vm.nuevoPaquetes.repartidor, vm.nuevoPaquetes.estado, idPaquetes);
        
      console.log(objPaquetesModificado);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.paquetesSeleccionado = servicioPaquetes.actualizarPaquetes(objPaquetesModificado);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El paquete ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('listarPaquetes');

      listarPaquetes();

      // Se limpia el formulario
      vm.nuevoPaquetes = null;
    }

    function listarPaquetes(){
    vm.listaPaquetes = servicioPaquetes.getPaquetes();
    }

  }
})();