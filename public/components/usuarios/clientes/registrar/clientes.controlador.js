(() => {
  'use strict';
  angular
    .module('correos-cr')
    .controller('controladorClientes', controladorClientes);

  controladorClientes.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'imageUpload', 'Upload'];

  function controladorClientes($stateParams, $state, servicioUsuarios, imageUpload, Upload) {
    let vm = this;

    vm.sucursales = ["San José", "Alajuela", "Heredia", "Cartago", "Guanacaste", "Puntarenas", "Limón"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Cédula nacional", "Residente", "Pasaporte", "DIMEX"];



    // Objeto sin formato
    vm.nuevoCliente = {};

    vm.listaClientes = listarClientes();

    listarClientes();

    // ***********Guardar imagen en Cloudinary
    vm.cloudObj = imageUpload.getConfiguration();

    vm.preRegistrarUsuario = (pnuevoUsuario) => {
      vm.cloudObj.data.file = pnuevoUsuario.fotoPerfil[0];
      Upload.upload(vm.cloudObj).success((data) => {
        vm.registrarCliente(pnuevoUsuario, data.url);
      });
    }
    // *****************************

    // Guardar un nuevo repartidor
    vm.registrarCliente = (pNuevoCliente, urlImagen) => {
      console.log(pNuevoCliente);

      let nuevoCliente = new Cliente(pNuevoCliente.tipoIdentificacion, pNuevoCliente.identificacion, pNuevoCliente.primerNombre, pNuevoCliente.segundoNombre, pNuevoCliente.primerApellido, pNuevoCliente.segundoApellido, urlImagen, pNuevoCliente.sexo, pNuevoCliente.fechaNacimiento, pNuevoCliente.email, pNuevoCliente.contrasenna, pNuevoCliente.provincia, pNuevoCliente.canton, pNuevoCliente.distrito, pNuevoCliente.direccion, 1, 'Cliente', pNuevoCliente.telefono, pNuevoCliente.sucursalPreferencia);

      let nuevaTarjeta = new Tarjeta(pNuevoCliente.titularTarjeta, pNuevoCliente.numeroTarjeta, pNuevoCliente.mesVencimiento, pNuevoCliente.annoVencimiento, pNuevoCliente.ccv, nuevoCliente.getEmail());

      nuevoCliente.agregarTarjeta(nuevaTarjeta);

      console.log(nuevoCliente);

      // Pasamos al servicio el nuevo obj de tipo cliente para ser almacenado en el localStorage
      servicioUsuarios.agregarUsuario(nuevoCliente);

      //   // Retroalimentacion Visual para los usuarios: SweetAlert
      swal("Registro exitoso", "El cliente se ha sido registrado correctamente", "success", {
        button: "Aceptar",
      });
      // $state.go('mantClientes');

      // Se limpia el formulario
      // vm.nuevoCliente = null;

      listarClientes();
    }

    // Imprimir lista de repartidores en el sistema
    function listarClientes() {
      vm.listaClientes = servicioUsuarios.obtenerUsuarioPorRol("Cliente");
    }

    vm.modificar = (pCliente) => {
      console.log(pCliente.identificacion);
      $state.go('modClientes', { identificacion: JSON.stringify(pCliente.identificacion) })
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
            swal("El usuario ha sido desactivado", {
              icon: "success",
            });
          } else {
            swal("Cancelando acción");
          }
        });
    }
  }
})();