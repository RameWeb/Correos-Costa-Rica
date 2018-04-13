(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorRepartidores', controladorRepartidores);

  controladorRepartidores.$inject = ['$stateParams', '$state','servicioUsuarios'];

  function controladorRepartidores($stateParams, $state, servicioUsuarios){
    let vm = this;

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    // Objeto sin formato
    vm.nuevoRepartidor = {};

    vm.listaRepartidores = listarRepartidores();

    listarRepartidores();

    // Guardar un nuevo repartidor
    vm.registrarRepartidor = (pNuevoRepartidor) => {
      console.log(pNuevoRepartidor);

      let nuevoRepartidor = new Repartidor(vm.nuevoRepartidor.identificacion,vm.nuevoRepartidor.nombre,vm.nuevoRepartidor.apellido1,vm.nuevoRepartidor.fechaNacimiento,vm.nuevoRepartidor.telefono,vm.nuevoRepartidor.provincia,vm.nuevoRepartidor.canton,vm.nuevoRepartidor.distrito,vm.nuevoRepartidor.direccion,vm.nuevoRepartidor.puesto,vm.nuevoRepartidor.sucursal,vm.nuevoRepartidor.email,vm.nuevoRepartidor.contrasenna,vm.nuevoRepartidor.licencia,vm.nuevoRepartidor.fotoLicencia,vm.nuevoRepartidor.vencimientoLicencia);
      console.log(nuevoRepartidor);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioUsuarios.agregarUsuario(nuevoRepartidor);

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El entierro se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });

      // Se limpia el formulario
      vm.nuevoRepartidor = null;

      listarRepartidores();
    }

    // Imprimir lista de repartidores en el sistema
    function listarRepartidores(){
      vm.listaRepartidores = servicioUsuarios.obtenerUsuario();
      console.log(vm.listaRepartidores);
    }

    vm.modificar = (prepartidor) =>{
      $state.go('modRepartidores', {identificacion: JSON.stringify(prepartidor.identificacion)})
    }
  }
})();