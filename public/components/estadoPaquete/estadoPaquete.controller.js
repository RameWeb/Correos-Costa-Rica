(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorEstadoPaquete', controladorEstadoPaquete);

  controladorEstadoPaquete.$inject = ['$http', 'servicioEstadoPaquete'];

  function controladorEstadoPaquete($http, servicioEstadoPaquete){

    let vm = this;

    vm.nuevoEstadoPaquete = {};

    vm.estadoPaquete = $http({
      method: 'GET',
      url: './sources/data/estadoPaquete.json'
    }).then( (success) => {
      vm.estadoPaquete = success.data;
    }, (error) => {
      console.log("OcurriÃ³ un error " + error.data);
    });


    vm.listaEstadoPaquete = listarEstadoPaquete();

    listarEstadoPaquete();
    // Función que es llamada desde el html para registra un nuevo Estado Paquete
    vm.registrarEstadoPaquete = (pnuevoEstadoPaquete) => {

      // Tomamos el objeto sin formato y lo convertimos en una instancia de la clase Estado Paquete
      let objNuevoEstadoPaquete = new EstadoPaquete(pnuevoEstadoPaquete.estadoPaquete);
     
      console.log('Estado Registrado');
      console.log(objNuevoEstadoPaquete);

      // Pasamos al servicio el nuevo obj de tipo Estado Paquete para ser almacenado en el localStorage
      servicioEstadoPaquete.addEstadoPaquete(objNuevoEstadoPaquete);

      // Retroalimentación Visual para los Estados de Paquete
      swal("Registro exitoso", "El estado ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoEstadoPaquete = null;
      listarEstadoPaquete();
    }

    function listarEstadoPaquete() {
      vm.listaEstadoPaquete = servicioEstadoPaquete.getEstadoPaquete();
    }

  }
})();