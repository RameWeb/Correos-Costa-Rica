(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorConvenioClientes', controladorConvenioClientes);

  controladorConvenioClientes.$inject = ['$stateParams', '$state', 'servicioConvenios', 'servicioConvenioClientes', 'servicioUsuarios'];

  function controladorConvenioClientes($stateParams, $state, servicioConvenios, servicioConvenioClientes, servicioUsuarios){
    let vm = this;

    vm.nuevoConvenio = {};

    vm.listaServicios = servicioConvenios.getConvenios();
    vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");
    listarConvenios();

    // Funcion que es llamada desde el html para regustra un nuevo usuario
    vm.registrarConvenio = (pnuevoConvenio) => {
      
      let idRandom = (Math.random()*Math.random())*1000
      console.log(idRandom);

      // Tomamos el objeto sin formato y lo comvertimos en un objeto de tipo cliente
      let objNuevoConvenio = new ConveniosClientes(pnuevoConvenio.servicio, pnuevoConvenio.cliente, pnuevoConvenio.direccion, idRandom)
      console.log(objNuevoConvenio);

      servicioConvenioClientes.agregarConvenioCliente(objNuevoConvenio);
      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "La nueva sucursal se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      listarConvenios();

      // Se limpia el formulario
      vm.nuevoConvenio = null;
    }
    function listarConvenios(){
      vm.listaConvClientes = servicioConvenioClientes.obtenerConvenioCliente();
    }
    
    vm.modificar = (pConvenio) =>{
      $state.go('modificar-convenios', {idConvenio: JSON.stringify(pConvenio.idConvenio)})
    }
  }
})(); 