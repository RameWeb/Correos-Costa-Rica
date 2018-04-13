(() => {
  'use strict';
  angular
  .module('correos-cr')
  .controller('controladorClientes', controladorClientes);

  controladorClientes.$inject = ['$stateParams', '$state','servicioUsuarios'];

  function controladorClientes($stateParams, $state, servicioUsuarios){
    let vm = this;

    vm.sucursales = ["San Jose", "Alajuela", "Heredia", "Cartago", "Guanacaste","Puntarenas", "Limon"];

    // Objeto sin formato
    vm.nuevoCliente = {};

    vm.listaClientes = listarClientes();

    listarClientes();

    // Guardar un nuevo repartidor
    vm.registrarCliente = (pNuevoCliente) => {
      console.log(pNuevoCliente);

      let nuevaTarjeta = new Tarjeta(vm.nuevoCliente.titularTarjeta,vm.nuevoCliente.numeroTarjeta,vm.nuevoCliente.mesVencimiento,vm.nuevoCliente.annoVencimiento,vm.nuevoCliente.ccv);

      let nuevoCliente= new Cliente(vm.nuevoCliente.identificacion, vm.nuevoCliente.nombre,vm.nuevoCliente.apellido1,vm.nuevoCliente.fechaNacimiento,vm.nuevoCliente.email,vm.nuevoCliente.contrasenna,vm.nuevoCliente.provincia,vm.nuevoCliente.canton,vm.nuevoCliente.distrito,vm.nuevoCliente.direccion,1,'Cliente',vm.nuevoCliente.telefono);
      console.log(nuevoCliente);

      nuevoCliente.agregarTarjeta(nuevaTarjeta);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioUsuarios.agregarUsuario(nuevoCliente);

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El cliente se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      // $state.go('mantClientes');

      // Se limpia el formulario
      vm.nuevoCliente = null;

      listarClientes();
    }

    // Imprimir lista de repartidores en el sistema
    function listarClientes(){
      vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");
    }

    vm.modificar = (pCliente) =>{
      console.log(pCliente.identificacion);
      $state.go('modClientes', {identificacion: JSON.stringify(pCliente.identificacion)})
    }

    vm.desactivar = (pCliente) => {
      swal({
        title: "Desea desactivar el cliente?",
        text: "Desea desactivar el cliente",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          pCliente.estado = false;
          console.log(pCliente.estado);
          servicioUsuarios.actualizarUsuario(pCliente);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  }
})();