(() => {
  'use strict';
  angular
    .module('correos-cr')
    .controller('controladorClientes', controladorClientes);

    controladorClientes.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'imageUpload', 'Upload', 'NgMap'];

  function controladorClientes($stateParams, $state, servicioUsuarios, imageUpload, Upload, NgMap){
    let vm = this;

    vm.sucursales = ["Alajuelita", "Bagaces", "Cañas", "Desamparados", "Cartago Centro", "Moravia", "Pavas", "Venecia"];

    vm.sexo = ["Femenino", "Masculino", "Sin especificar"];

    vm.tipoIdentificacion = ["Cédula nacional", "Residente", "Pasaporte", "DIMEX"];

    NgMap.getMap("map").then(function (map) {
      vm.map = map;
    });

    vm.callbackFunc = function (param) {
      vm.latitude = vm.map.getCenter().lat();
      vm.longitude = vm.map.getCenter().lng();
    };

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

      let nuevoCliente = new Cliente(pNuevoCliente.tipoIdentificacion, pNuevoCliente.identificacion, pNuevoCliente.primerNombre, pNuevoCliente.segundoNombre, pNuevoCliente.primerApellido, pNuevoCliente.segundoApellido, urlImagen, pNuevoCliente.sexo, pNuevoCliente.fechaNacimiento, pNuevoCliente.email, pNuevoCliente.contrasenna, pNuevoCliente.provincia, pNuevoCliente.canton, pNuevoCliente.distrito, pNuevoCliente.direccion, 1, 'Cliente', pNuevoCliente.telefono, pNuevoCliente.sucursalPreferencia, pNuevoCliente.latitud, pNuevoCliente.longitud);

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
      console.log(pCliente.email);
      $state.go('modClientes', { email: JSON.stringify(pCliente.email) })
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