(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorPaquetes', controladorPaquetes);

  controladorPaquetes.$inject = ['$stateParams', '$state', 'servicioPaquetes', 'servicioUsuarios'];

  function controladorPaquetes($stateParams, $state, servicioPaquetes, servicioUsuarios){

    let vm = this;

    vm.nuevoPaquetes = {};
    vm.listaPaquetes = listarPaquetes();
    vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");

    listarPaquetes();
    vm.registrarPaquetes = (pnuevoPaquetes) => {
       
      let idRandom = (Math.random()*Math.random())*1000;

      console.log(pnuevoPaquetes);

      let objNuevoPaquetes = new Paquetes(pnuevoPaquetes.tracking, pnuevoPaquetes.nombre, pnuevoPaquetes.peso, pnuevoPaquetes.valor, pnuevoPaquetes.repartidor, pnuevoPaquetes.estado, idRandom);
     
      console.log('objeto con paquete');
      console.log(objNuevoPaquetes);

      servicioPaquetes.addPaquetes(objNuevoPaquetes);

      swal("Registro exitoso", "El paquete ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      vm.nuevoPaquetes = null;
      listarPaquetes();
    }

   

    function listarPaquetes() {
      vm.listaPaquetes = servicioPaquetes.getPaquetes();
    }

   
    
  }
})();