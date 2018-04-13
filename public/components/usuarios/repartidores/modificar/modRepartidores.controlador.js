(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorModRepartidores', controladorModRepartidores);

  controladorModRepartidores.$inject = ['$http','$stateParams', '$state','servicioUsuarios'];

  function controladorModRepartidores($http, $stateParams, $state, servicioUsuarios){
    
    let repartidorSeleccionado;

    if($stateParams.identificacion == ''){
      $state.go('mantRepartidores');
    }else{
      repartidorSeleccionado = servicioUsuarios.obtenerUsuarioPorRol($stateParams.identificacion);
    }
    console.log(repartidorSeleccionado);

    let vm = this;

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    vm.nuevoRepartidor = {
      // identificacion: repartidorSeleccionado.identificacion,
      identificacion: repartidorSeleccionado.identificacion,
      nombre: repartidorSeleccionado.nombre,
      apellido1: repartidorSeleccionado.apellido1,
      email: repartidorSeleccionado.email,
      contrasenna: repartidorSeleccionado.contrasenna,
      fechaNacimiento: new Date(repartidorSeleccionado.fechaNacimiento),
      telefono: repartidorSeleccionado.telefono,
      provincia: repartidorSeleccionado.provincia,
      canton: repartidorSeleccionado.canton,
      distrito: repartidorSeleccionado.distrito,
      direccion: repartidorSeleccionado.direccion,
      puesto: repartidorSeleccionado.puesto,
      sucursal: repartidorSeleccionado.sucursal,
      email: repartidorSeleccionado.email,
      contrasenna: repartidorSeleccionado.contrasenna,
      licencia: repartidorSeleccionado.licencia,
      fotoLicencia: repartidorSeleccionado.fotoLicencia,
      vencimientoLicencia: new Date(repartidorSeleccionado.vencimientoLicencia)
    };

    vm.modificarRepartidor = (pNuevoRepartidor) =>{
      let identificacion = repartidorSeleccionado.identificacion;
      let repartidorModificado = new Repartidor(vm.nuevoRepartidor.identificacion,vm.nuevoRepartidor.nombre,vm.nuevoRepartidor.apellido1,vm.nuevoRepartidor.fechaNacimiento,vm.nuevoRepartidor.telefono,vm.nuevoRepartidor.provincia,vm.nuevoRepartidor.canton,vm.nuevoRepartidor.distrito,vm.nuevoRepartidor.direccion,vm.nuevoRepartidor.puesto,vm.nuevoRepartidor.sucursal,vm.nuevoRepartidor.email,vm.nuevoRepartidor.contrasenna,vm.nuevoRepartidor.licencia,vm.nuevoRepartidor.fotoLicencia,vm.nuevoRepartidor.vencimientoLicencia);

    console.log(repartidorModificado);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      vm.RepartidorSeleccionado = servicioUsuarios.actualizarRepartidor(repartidorModificado);

      // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El repartidor se ha sido modificado correctamente", "success", {
        button: "Aceptar",
      });

      $state.go('mantRepartidores');

      listarRepartidores();

      // Se limpia el formulario
      vm.nuevoRepartidorModificado = null;
    }

    // Imprimir lista de repartidores en el sistema
    function listarRepartidores(){
      vm.listaRepartidores = servicioUsuarios.obtenerRepartidores();
    }
  }
})();